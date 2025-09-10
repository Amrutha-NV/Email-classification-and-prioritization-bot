const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { title } = require("process");
const ejsMate = require('ejs-mate');
const Email = require("./models/email.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.json());

const mongoose = require('mongoose');
main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

app.get("/", (req, res) => {
    res.send("request is successful");
})

app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
})