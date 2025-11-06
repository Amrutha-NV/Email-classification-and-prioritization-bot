const express = require("express");
const moongoose = require("mongoose");
const router = express.Router();
const Email = require("../models/emails.js");
const path = require("path");
router.use(express.urlencoded({ extended: true }));
const authCheck = require("../middelwares.js/authcheck.js");
const { script } = require("googleapis/build/src/apis/script/index.js");



//to render compose page
router.get("/compose", authCheck,(req, res) => {
    res.render("./email/compose.ejs");
});

// to add emails composed to database
router.post("/", authCheck,async(req, res) => {
        const email = req.body.email
        console.log(email);
        const mail = new Email(email);
        await mail.save();
        res.redirect("/emails/");
        req.flash('success', 'A new mail recieved!');
    });
//to read emails from database
router.get("/",authCheck, async(req, res) => {
    const emails = await Email.find({});
    res.render("./email/inbox.ejs", { emails });
});



// Category routes

// Work Emails
router.get("/work", authCheck,async (req, res) => {
    const emails = await Email.find({ label: 'work', spam : false });
    res.render("./email/work.ejs", { emails });
});

// Personal Emails
router.get("/personal",authCheck, async (req, res) => {
    const emails = await Email.find({ label: "personal" , spam : false });
    res.render("./email/personal.ejs", { emails });
});

// Promotions Emails
router.get("/promotions",authCheck, async (req, res) => {
    const emails = await Email.find({ label: "promotions" , spam : false });
    res.render("./email/promotions.ejs", { emails });
});

// Spam Emails
router.get("/spam",authCheck, async (req, res) => {
    const emails = await Email.find({ spam: true });
    res.render("./email/spam.ejs", { emails });
});
//urgent Emails
router.get("/urgent",authCheck, async (req, res) => {
    const emails = await Email.find({ urgent: true ,spam : false });
    res.render("./email/urgent.ejs", { emails });
});

// to view individual emails
router.get("/:id",authCheck, async(req, res) => {
    let { id } = req.params;
    const email = await Email.findById(id);
    res.render("./email/show.ejs", { email });
});

// to delete individual email
router.delete("/:id",authCheck, async(req, res) => {
    let { id } = req.params;
    const email = await Email.findByIdAndDelete(id);
    res.redirect("/emails/");
    req.flash('success', 'Email deleted successfully!');
});




module.exports = router;