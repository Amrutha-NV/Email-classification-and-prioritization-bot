require('dotenv').config();
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const phishingRoute = require("./routes/phishing");
const cookieSession = require('cookie-session');
const session = require('express-session');
const mongoose=require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passportsetup');
const emailrouter = require("./routes/emails.js");
const userrouter = require("./routes/user.js");
const draftRoutes = require("./routes/draft.js");
const flash = require('connect-flash');


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
}
main();

//views
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// sessions
app.use(session({
   secret: 'your_session_secret',
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// passort
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

app.use("/phishing", phishingRoute);
app.use("/emails", emailrouter);
app.use("/auth", userrouter);
app.use("/draft", draftRoutes);




// webhook to call pub sub handler
const { handlePubSubPush } = require('./config/pubsubHandler.js');
app.post('/webhook/gmail', handlePubSubPush);

// activating the server
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
