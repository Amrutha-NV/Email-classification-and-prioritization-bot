require('dotenv').config();
console.log("TEST WHATSAPP NUMBER LOADED:", process.env.TEST_WHATSAPP_NUMBER);
const axios = require("axios");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// ROUTES & HELPERS
const emailrouter = require("./routes/emails.js");
const phishingRoute = require("./routes/phishing");
const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passportsetup');
const userrouter = require("./routes/user.js");
const { google } = require('googleapis');
const Email = require('./models/emails.js');
const { getAccessTokenFromRefreshToken } = require('./config/gmailhelper.js');
const { handlePubSubPush } = require('./config/pubsubHandler.js');
const draftRoutes = require("./routes/draft.js");

// ---------- View Engine Setup ----------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ---------- Session & Flash ----------
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// ---------- Passport ----------
app.use(passport.initialize());
app.use(passport.session());

// ---------- Database ----------
const mongoose = require('mongoose');
main().then(() => console.log("connection made successfully"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

// ---------- Routes ----------
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

app.use("/phishing", phishingRoute);
app.use("/emails", emailrouter);
app.use("/auth", userrouter);
app.use("/draft", draftRoutes);

// ---------- Gmail Webhook ----------
app.post('/webhook/gmail', express.json({ limit: '1mb' }), handlePubSubPush);


// ---------- Test WhatsApp ----------
const sendWhatsappMessage = require("./utils/sendWhatsapp");

app.get("/test-whatsapp", async (req, res) => {
  await sendWhatsappMessage("🚨 Test WhatsApp alert from backend!");
  res.send("WhatsApp message sent!");
});


// ---------- Start Server ----------
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
