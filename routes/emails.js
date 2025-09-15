const express = require("express");
const moongoose = require("mongoose");
const router = express.Router();
const Email = require("../models/emails.js");
const path = require("path");
router.use(express.urlencoded({ extended: true }));
router.get("/", async(req, res) => {
    const emails = await Email.find({});
    res.render("../views/layouts/bolierplate.ejs");
})
module.exports = router;