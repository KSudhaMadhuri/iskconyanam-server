const express = require("express");
const route = express.Router();
const sendMail=require("../controller/mailController");

route.post("/sendmail",sendMail)
module.exports = route;