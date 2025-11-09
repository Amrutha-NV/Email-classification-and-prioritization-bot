const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { title } = require("process");
const ejsMate = require('ejs-mate');
const cookieSession = require('cookie-session');
const session = require('express-session'); 
const passport = require('passport');
const passportSetup = require('./config/passportsetup');
const emailrouter = require("./routes/emails.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// Ensure JSON body parser is registered before any routes that use req.body
app.use(express.json());

const mongoose = require('mongoose');
main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

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



app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});