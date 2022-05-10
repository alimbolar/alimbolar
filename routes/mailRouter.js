const express = require("express");
const app = require("..");
const router = express.Router();
const mailController = require("./../controllers/mailController");

router.use("/sendContactUsMessage", mailController.sendContactUsMessage);

module.exports = router;
