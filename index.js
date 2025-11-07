const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const emailrouter = require("./routes/emails.js");
const phishingRoute = require("./routes/phishing");

// ---------- View Engine Setup FIRST ----------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
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
