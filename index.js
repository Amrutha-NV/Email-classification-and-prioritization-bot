require('dotenv').config();
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const emailrouter = require("./routes/emails.js");
const phishingRoute = require("./routes/phishing");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { title } = require("process");
const ejsMate = require('ejs-mate');
const cookieSession = require('cookie-session');
const session = require('express-session'); 
const passport = require('passport');
const passportSetup = require('./config/passportsetup');
const emailrouter = require("./routes/emails.js");
const userrouter=require("./routes/user.js");
const { google } = require('googleapis');
const User = require('./models/user.js');
const Email = require('./models/emails.js'); // added: Email model
const { getAccessTokenFromRefreshToken } = require('./config/gmailhelper.js');
const { handlePubSubPush } = require('./config/pubsubHandler.js');
const draftRoutes = require("./routes/draft.js");

// ---------- View Engine Setup FIRST ----------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// Ensure JSON body parser is registered before any routes that use req.body
app.use(express.json());
app.use(methodOverride('_method'));

// ---------- ROUTES (AFTER express.json) ----------
app.use("/phishing", phishingRoute);
app.use("/emails", emailrouter);

// ---------- Database ----------
const mongoose = require('mongoose');
main().then(() => console.log("connection made successfully"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

// ---------- Start Server ----------
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
// set up session cookies
app.use(session({
   secret: 'your_session_secret', // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // Set session to expire after 24 hours
    }
}));
const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.redirect("/auth/login");
});
app.use("/emails", emailrouter);
app.use("/auth",userrouter);
app.use("/draft", draftRoutes);

// helper to decode base64url/body parts
function decodeBase64Url(input) {
    if (!input) return '';
    let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    return Buffer.from(b64, 'base64').toString('utf8');
}
function extractMessageBody(payload) {
    if (!payload) return '';
    if (payload.body && payload.body.data) return decodeBase64Url(payload.body.data);
    if (Array.isArray(payload.parts)) return payload.parts.map(part => extractMessageBody(part)).filter(Boolean).join('\n');
    return '';
}

// preprocessing middleware to fetch full email details
app.post('/webhook/gmail', express.json({ limit: '1mb' }), handlePubSubPush);

app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});
