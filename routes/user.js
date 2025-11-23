// ------------------------------------
// ✅ User & Auth Router
// ------------------------------------
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

const User = require('../models/user.js');
require('../config/passportsetup');

const authCheck = require('../middelwares.js/authcheck.js');
const { startWatch } = require('../config/gmailhelper.js');

// Ensure a valid middleware function
let ensureAuthenticated = authCheck;
if (typeof ensureAuthenticated !== 'function') {
  ensureAuthenticated = (req, res, next) => {
    if (req && typeof req.isAuthenticated === 'function' ? req.isAuthenticated() : !!req.user)
      return next();
    return res.redirect('/auth/login');
  };
}

// ------------------------------------
// 🔐 Login & Logout Routes
// ------------------------------------
router.get('/login', (req, res) => {
  res.render('./user/userlogin.ejs');
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.redirect('/auth/login');
      });
    } else {
      return res.redirect('/auth/login');
    }
  });
});

// ------------------------------------
// 🌐 Google OAuth Login
// ------------------------------------
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.labels',
    ],
    accessType: 'offline', // guarantees refresh token
    prompt: 'consent', // forces re-consent for fresh refresh token
  })
);

// ------------------------------------
// Google OAuth Callback
// ------------------------------------
router.get(
  '/google/redirect',
  passport.authenticate('google', { successRedirect:'/emails',failureRedirect: '/auth/login', session: true }),
  async (req, res) => {
    try {
      const user = req.user;

      // Some Passport strategies put refreshToken in req.account
      if (req.account && req.account.refreshToken) {
        user.gmail_refresh_token = req.account.refreshToken;
        await user.save();
        console.log('✅ Saved new Gmail refresh token for user:', user.id);
      } else if (!user.gmail_refresh_token) {
        console.warn(
          '⚠️ No refresh token received — ensure accessType=offline and prompt=consent are set.'
        );
      }

      req.flash('success', 'Google account linked successfully!');
      res.redirect('/emails');
    } catch (err) {
      console.error('Error during Google callback:', err);
      req.flash('error', 'Authentication failed. Please try again.');
      res.redirect('/auth/login');
    }
  }
);

// ------------------------------------
// 📩 Start Gmail Pub/Sub Watch
// ------------------------------------
router.post('/sync/start', ensureAuthenticated, async (req, res) => {
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
    const projectId = (process.env.GCP_PROJECT_ID || '').trim();
    const topic = (process.env.PUBSUB_TOPIC_NAME || '').trim();

    if (!projectId || !topic) {
      console.error('Missing GCP_PROJECT_ID or PUBSUB_TOPIC_NAME in .env');
      req.flash('error', 'Server not configured for Pub/Sub. Contact admin.');
      return res.status(500).redirect('/emails');
    }

    const topicName = `projects/${projectId}/topics/${topic}`;
    console.log('Using Pub/Sub topic:', `"${topicName}"`);

    const watchResponse = await startWatch(user.gmail_refresh_token, topicName, ['INBOX']);

    // Update DB with watch details
    user.gmail_history_id = watchResponse.historyId || null;
    user.gmail_sync_status = true;
    await user.save();

    req.flash('success', 'Real-time Gmail sync activated!');
    console.log('Gmail sync started for user:', user.id, 'historyId:', watchResponse.historyId);
    return res.redirect('/emails');
  } catch (error) {
    console.error('Error starting Gmail watch:', error);

    if (error.message.includes('reauthenticate')) {
      req.flash('error', 'Your Gmail access expired. Please log in again.');
      return res.redirect('/auth/google');
    } else if (error.code === 401 || error.code === 403) {
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


































