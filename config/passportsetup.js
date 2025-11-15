
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.js');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error(' Missing Google OAuth credentials in .env');
  process.exit(1);
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Find by email instead of googleId (safer)
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update refresh token if a new one is issued
          if (refreshToken) {
            user.gmail_refresh_token = refreshToken;
            await user.save();
            console.log('Updated refresh token for:', user.email);
          }

          console.log(' Existing user logged in:', user.email);
          return done(null, user);
        } else {
          // Create new user
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: profile.displayName,
            displayName: profile.displayName,
            gmail_refresh_token: refreshToken,
          });

          await user.save();
          console.log(' Created new user:', user.email);
          return done(null, user);
        }
      } catch (err) {
        console.error(' Error in GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);



















