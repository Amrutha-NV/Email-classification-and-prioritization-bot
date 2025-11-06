require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const passport = require('passport');
require('../config/passportsetup');

// ensure this path matches your project structure
const authCheck = require('../middelwares.js/authcheck.js');
const { startWatch } = require('../config/gmailhelper.js');

// Guarantee we have a callable middleware
let ensureAuthenticated = authCheck;
if (typeof ensureAuthenticated !== 'function') {
    ensureAuthenticated = function (req, res, next) {
        if (req && typeof req.isAuthenticated === 'function' ? req.isAuthenticated() : !!req.user) return next();
        return res.redirect('/auth/login');
    };
}

// auth login
router.get('/login', (req, res) => {
    res.render('./user/userlogin.ejs');
});

// auth logout
router.get('/logout', (req, res, next) => {
   req.logout(function(err) {
        if (err) return next(err);
        if (req.session) {
            req.session.destroy(function(err) {
                res.clearCookie('connect.sid');
                return res.redirect('/auth/login');
            });
        } else {
            return res.redirect('/auth/login');
        }
    });
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.labels"
    ],
    accessType: 'offline',
    prompt: 'consent'
}));

// callback route for google to redirect to
router.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/auth/login', session: true }),
    (req, res) => {
        // req.user should be available here
        res.redirect('/emails');
    }
);

// watch route to start Gmail API push notification
// make sure the middleware passed here is a function
router.post('/sync/start', authCheck, async (req, res) => {
    const user = req.user;
    console.log('Sync start requested, user:', user && user.id);

    if (!user) {
        req.flash('error', 'User not authenticated.');
        return res.status(401).redirect('/auth/login');
    }

    if (!user.gmail_refresh_token) {
        req.flash('error', 'Gmail access not granted. Please log in and approve permissions.');
        console.log('Gmail access not granted for user:', user.id);
        return res.status(400).redirect('/emails');
    }

    try {
        // Trim and validate environment vars
        const projectId = (process.env.GCP_PROJECT_ID || '').trim();
        const topic = (process.env.PUBSUB_TOPIC_NAME || '').trim();

        if (!projectId || !topic) {
            console.error('Missing GCP_PROJECT_ID or PUBSUB_TOPIC_NAME in .env');
            req.flash('error', 'Server not configured for Pub/Sub. Contact admin.');
            return res.status(500).redirect('/emails');
        }

        //  Build a clean Pub/Sub topic path
        const topicName = `projects/${projectId}/topics/${topic}`;
        console.log('Using Pub/Sub topic:', `"${topicName}"`);

        // Start Gmail watch
        const watchResponse = await startWatch(user.gmail_refresh_token, topicName, ['INBOX']);

        //  Update user sync info
        user.gmail_history_id = watchResponse.historyId || null;
        user.gmail_sync_status = true;
        await user.save();

        req.flash('success', ' Real-time Gmail sync activated!');
        console.log('Gmail sync started for user:', user.id, 'historyId:', watchResponse.historyId);
        return res.redirect('/emails');
    } catch (error) {
        console.error('Error starting Gmail watch:', error);

        if (error.code === 401 || error.code === 403) {
            req.flash('error', 'Authorization revoked. Please log out and log in again.');
        } else if (error.message?.includes('Invalid topic name format')) {
            req.flash('error', 'Invalid Pub/Sub topic format. Check .env settings.');
        } else {
            req.flash('error', 'Failed to start Gmail sync. Please try again later.');
        }

        return res.status(500).redirect('/emails');
    }
});


module.exports = router;