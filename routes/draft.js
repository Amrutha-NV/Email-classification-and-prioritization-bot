// ----------------------------------------------------
// Draft Routes — Generate, View, Edit & Send Replies
// ----------------------------------------------------

const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const OpenAI = require("openai");
const Draft = require("../models/draft.js");
const Email = require("../models/emails.js");
const authCheck = require("../middelwares.js/authcheck.js");
const { getAccessTokenFromRefreshToken } = require("../config/gmailhelper.js");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


// ----------------------------------------------------
// 1️⃣ Show all drafts
// ----------------------------------------------------
router.get("/", authCheck, async (req, res, next) => {
  try {
    const drafts = await Draft.find({ status: { $ne: "sent" } })
      .populate("originalEmail")
      .sort({ createdAt: -1 });

    return res.render("./email/draft.ejs", { drafts });
  } catch (err) {
    console.error("❌ Error loading drafts:", err);
    next(err);
  }
});


// ----------------------------------------------------
// 2️⃣ Generate AI Draft from Urgent Email
// ----------------------------------------------------
router.get("/from-email/:emailId", authCheck, async (req, res) => {
  try {
    const email = await Email.findById(req.params.emailId);
    if (!email) return res.status(404).send("Email not found");

    // Check for existing draft
    let existingDraft = await Draft.findOne({ originalEmail: email._id });
    if (existingDraft) {
      console.log("📄 Existing draft found — redirecting...");
      return res.redirect(`/draft/${existingDraft._id}`);
    }

    // Generate AI reply
    const prompt = `
You are an intelligent email assistant. Write a clear, concise, and polite reply to this urgent message.

Email Details:
From: ${email.from}
To: ${email.to}
Subject: ${email.subject}
Body: ${email.body}

Guidelines:
- Reply naturally, addressing the issue directly.
- DO NOT include greetings or signatures.
- Keep it brief and to the point.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const aiReply = completion.choices[0].message.content.trim();
    const draftBody = aiReply.replace(/^Subject:.*\n/, "").trim();

    // Create new draft
    const newDraft = new Draft({
      originalEmail: email._id,
      draftBody,
      category: "urgent",
      status: "pending",
    });

    await newDraft.save();
    console.log(`✅ Draft created for urgent email: ${email.subject}`);

    return res.redirect(`/draft/${newDraft._id}`);
  } catch (err) {
    console.error("❌ Error generating AI draft:", err);
    res.status(500).send("Error generating draft message");
  }
});


// ----------------------------------------------------
// 3️⃣ Show a single draft
// ----------------------------------------------------
router.get("/:id", authCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const draft = await Draft.findById(id).populate("originalEmail");
    if (!draft) return res.status(404).send("Draft not found");

    console.log("📨 Loaded Draft:", draft._id);
    return res.render("./email/showdraft.ejs", { draft });
  } catch (err) {
    console.error("❌ Error loading draft:", err);
    next(err);
  }
});


// ----------------------------------------------------
// 4️⃣ Save / Update a Draft
// ----------------------------------------------------
router.put("/:id", authCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { draftBody, subject } = req.body;

    const draft = await Draft.findById(id);
    if (!draft) return res.status(404).send("Draft not found");

    // Update fields
    draft.draftBody = draftBody || draft.draftBody;
    if (subject && draft.originalEmail) {
      const email = await Email.findById(draft.originalEmail);
      if (email) {
        email.subject = subject;
        await email.save();
      }
    }

    draft.status = "edited";
    draft.updatedAt = Date.now();
    await draft.save();

    console.log(`✏️ Draft updated successfully: ${draft._id}`);
    res.redirect(`/draft/${id}`);
  } catch (err) {
    console.error("❌ Error updating draft:", err);
    next(err);
  }
});

// ----------------------------------------------------
// 5️⃣ SEND DRAFT as a REAL GMAIL EMAIL
// ----------------------------------------------------
router.post("/:id/send", authCheck, async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id).populate("originalEmail");
    if (!draft) return res.status(404).send("Draft not found");

    const user = req.user;
    if (!user.gmail_refresh_token) return res.send("No Gmail access");

    const { client } = await getAccessTokenFromRefreshToken(user.gmail_refresh_token);
    const gmail = google.gmail({ version: "v1", auth: client });

    const rawMessage =
      `From: ${user.email}\r\n` +          
      `To: ${draft.originalEmail.from}\r\n` +
      `Subject: ${draft.originalEmail.subject}\r\n\r\n` +
      `${draft.draftBody}`;

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    console.log("✔ Email sent!");

    // 🔥 UPDATE DRAFT STATUS
    draft.status = "sent";
    draft.sentAt = new Date();
    await draft.save();

    req.flash("success", "Email sent successfully!");
    // Redirect to view page
    res.redirect("/emails/urgent");

  } catch (err) {
    console.error("Send error:", err);
    res.status(500).send("Error sending email");
  }
});


// ----------------------------------------------------
// 6️⃣ Delete a Draft
// ----------------------------------------------------
router.delete("/:id", authCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Draft.findByIdAndDelete(id);
    req.flash("success", "Draft deleted successfully!");
    res.redirect("/draft");
  } catch (err) {
    console.error("❌ Error deleting draft:", err);
    next(err);
  }
});



module.exports = router;
