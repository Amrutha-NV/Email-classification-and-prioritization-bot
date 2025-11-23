const { google } = require('googleapis');
const User = require('../models/user.js');
const Email = require('../models/emails.js');
const { getAccessTokenFromRefreshToken } = require('./gmailhelper.js');
const { classifyEmail } = require('./geminiclassify.js');
const sendWhatsappMessage = require("../utils/sendWhatsapp.js");
const axios = require("axios");

function decodeBase64Url(input) {
    if (!input) return '';
    let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return Buffer.from(b64, 'base64').toString('utf8');
}

function stripHtml(html) {
    if (!html) return '';
    // remove tags
    let text = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ');
    text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ');
    text = text.replace(/<\/?[^>]+(>|$)/g, ' ');
    // collapse whitespace
    text = text.replace(/\s+/g, ' ').trim();
    // decode a few common HTML entities
    const entities = {
        '&nbsp;': ' ',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    };
    return text.replace(/&[^\s;]+;/g, (e) => entities[e] || e);
}

/**
 * Extract best plain-text body from a message payload.
 * - Prefer parts with mimeType 'text/plain'
 * - If only 'text/html' present, strip HTML tags and decode entities
 * - Handles nested multipart structures
 */
function extractMessageBody(payload) {
    if (!payload) return '';
    // direct body on payload
    if (payload.mimeType === 'text/plain' && payload.body && payload.body.data) {
        return decodeBase64Url(payload.body.data).trim();
    }
    if (payload.mimeType === 'text/html' && payload.body && payload.body.data) {
        return stripHtml(decodeBase64Url(payload.body.data));
    }

    // multipart: search parts for text/plain first
    if (Array.isArray(payload.parts) && payload.parts.length) {
        // depth-first search for text/plain
        for (const part of payload.parts) {
            const result = extractMessageBody(part);
            if (result) return result;
        }
    }

    // fallback: if payload.body.data exists, decode and strip HTML just in case
    if (payload.body && payload.body.data) {
        const decoded = decodeBase64Url(payload.body.data);
        // if looks like HTML, strip; otherwise return as-is
        if (/<[a-z][\s\S]*>/i.test(decoded)) {
            return stripHtml(decoded);
        }
        return decoded.trim();
    }

    return '';
}

/**
 * Express handler to process Pub/Sub push from Gmail.
 * - Decodes Pub/Sub envelope
 * - Finds user by emailAddress
 * - Uses stored refresh token to call gmail.users.history.list and gmail.users.messages.get
 * - Persists each cleaned message into the Email collection (associates user._id)
 *
 * Note: this handler intentionally avoids printing full messages to console.
 * 
/** */
function extractEmail(raw){
    if(!raw)return '';
    const match=raw.match(/<(.+?)>/);
    if(match)return match[1].trim();
    return raw.trim();
}
async function handlePubSubPush(req, res) {
    try {
        console.log('Received Pub/Sub push notification');
        const pubsubMessage = req.body && req.body.message;
        console.log(pubsubMessage ? 'Pub/Sub message found' : 'No Pub/Sub message in body');

        if (!pubsubMessage) {
            return res.status(200).send('ignored');
        }

        const raw = Buffer.from(pubsubMessage.data || '', 'base64').toString('utf8');
        let payload;
        try { payload = JSON.parse(raw); } catch (e) { payload = {}; }

        const emailAddress = payload.emailAddress || payload.email || null;
        const newHistoryId = payload.historyId || payload.history_id || null;
        if (!emailAddress) {
            return res.status(200).send('ignored');
        }

        const user = await User.findOne({ email: emailAddress });
        if (!user || !user.gmail_refresh_token) {
            return res.status(200).send('no-user-or-no-token');
        }

        const { client } = await getAccessTokenFromRefreshToken(user.gmail_refresh_token);
        const gmail = google.gmail({ version: 'v1', auth: client });

        // get history (fallback to recent messages)
        let histories = [];
        try {
            if (user.gmail_history_id) {
                const histRes = await gmail.users.history.list({
                    userId: 'me',
                    startHistoryId: user.gmail_history_id,
                });
                histories = histRes.data.history || [];
            } else {
                const msgList = await gmail.users.messages.list({
                    userId: 'me',
                    labelIds: ['INBOX'],
                    maxResults: 10
                });
                const ids = (msgList.data.messages || []).map(m => m.id);
                if (ids.length) histories = [{ messages: ids.map(id => ({ id })) }];
            }
        } catch (err) {
            const msgList = await gmail.users.messages.list({
                userId: 'me',
                labelIds: ['INBOX'],
                maxResults: 10
            });
            const ids = (msgList.data.messages || []).map(m => m.id);
            if (ids.length) histories = [{ messages: ids.map(id => ({ id })) }];
        }

        // collect message ids
        const messageIds = new Set();
        for (const h of histories) {
            if (Array.isArray(h.messagesAdded)) {
                for (const ma of h.messagesAdded) {
                    const mid = ma && ma.message && ma.message.id;
                    if (mid) messageIds.add(mid);
                }
            }
            if (Array.isArray(h.messages)) {
                for (const m of h.messages) {
                    const mid = m && (m.id || (m.message && m.message.id));
                    if (mid) messageIds.add(mid);
                }
            }
        }

        // fetch each message, classify and persist cleaned text
        let processed = 0;
        for (const id of Array.from(messageIds)) {
            try {
                const msgRes = await gmail.users.messages.get({
                    userId: 'me',
                    id,
                    format: 'full'
                });
                const msg = msgRes.data;
                const headers = (msg.payload && msg.payload.headers) || [];
                const getHeader = name => {
                    const h = headers.find(h => h.name && h.name.toLowerCase() === name.toLowerCase());
                    return h ? h.value : null;
                };

                const subject = getHeader('Subject') || '';
                const cleanedBody = extractMessageBody(msg.payload);
                console.log(`Processing message ID: ${msg.id}, Subject: "${subject}", User: ${user._id}`);

               // classify email: returns { category, isUrgent }
                let category = "";
                let isUrgent = false;
                try {
                    const cls = await classifyEmail(cleanedBody || subject, subject);
                    if (cls && cls.category) category = String(cls.category).toLowerCase();
                    if (cls && typeof cls.isUrgent === 'boolean') isUrgent = cls.isUrgent;
                } catch (clsErr) {
                    console.error('Classification error:', clsErr && clsErr.message ? clsErr.message : clsErr);
            }
            // 🚨 If urgent email detected, send WhatsApp notification
            if (isUrgent) {
            console.log("🚨 Urgent Email Detected — Sending WhatsApp Notification");

            await sendWhatsappMessage(
                `🚨 URGENT EMAIL ALERT 🚨\n\nSubject: ${subject}\nFrom: ${extractEmail(getHeader('From'))}\n\nPlease check immediately.`
            );
            }

            let isSpam = false;

try {

  console.log("Sending text to Flask spam classifier...");

  const flaskResponse = await axios.post("http://127.0.0.1:5001/predict", {
    text: cleanedBody || subject
  });

  console.log("Flask response received:", flaskResponse.data);

  if (flaskResponse.data && typeof flaskResponse.data.isSpam === "boolean") {
    isSpam = flaskResponse.data.isSpam;
  }
} catch (spamErr) {
  console.error(" Spam API error:", spamErr.message || spamErr);
}



                // save if not exists
                try {
                    const existing = await Email.findOne({ gmail_message_id: msg.id });
                    if (!existing) {
                        const emailDoc = new Email({
                            user: user._id,
                            gmail_message_id: msg.id,
                            gmail_thread_id: msg.threadId,
                            from: extractEmail(getHeader('From')) || '',
                            to: extractEmail(getHeader('To')) || '',
                            subject: subject,
                            snippet: msg.snippet || '',
                            body: cleanedBody || '',
                            label: category || 'inbox',
                            labels: [category || 'inbox'],
                            urgent: !!isUrgent,
                            spam: !!isSpam,   
                            receivedAt: getHeader('Date') ? new Date(getHeader('Date')) : new Date()
                        });
                        await emailDoc.save();
    
                    }
                    processed++;
                } catch (saveErr) {
                    console.error('Error saving email to DB:', saveErr);
                }
            } catch (e) {
                console.error('Failed to fetch message', id, e && e.message ? e.message : e);
            }
        }

        // persist new history id if provided
        if (newHistoryId) {
            user.gmail_history_id = newHistoryId;
            user.gmail_sync_status = true;
            await user.save();
        }

        return res.status(200).json({ ok: true, processed });
    } catch (err) {
        console.error('Error in handlePubSubPush:', err && err.message ? err.message : err);
        return res.status(500).send('Handler error');
    }
}

module.exports = { handlePubSubPush };