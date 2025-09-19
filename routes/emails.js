const express = require("express");
const moongoose = require("mongoose");
const router = express.Router();
const Email = require("../models/emails.js");
const path = require("path");
router.use(express.urlencoded({ extended: true }));

//to render compose page
router.get("/compose", (req, res) => {
    res.render("./email/compose.ejs");
});
// to add emails composed to database
router.post("/", async(req, res) => {
        const email = req.body.email
        const mail = new Email(email);
        await mail.save();
        res.redirect("/emails/");
    })
    //to read emails from database
router.get("/", async(req, res) => {
    const emails = await Email.find({});
    res.render("./email/inbox.ejs", { emails });
});
// to view indivisual emails
router.get("/:id", async(req, res) => {
    let { id } = req.params;
    const email = await Email.findById(id);
    res.render("./email/show.ejs", { email });
});
// to delete indivisual email
router.delete("/:id", async(req, res) => {
    let { id } = req.params;
    const email = await Email.findByIdAndDelete(id);
    res.redirect("/emails/");
})

module.exports = router;