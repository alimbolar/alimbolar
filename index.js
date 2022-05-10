const path = require("path");
const express = require("express");
const app = express();
const mailRouter = require("./routes/mailRouter");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/mail", mailRouter);

module.exports = app;
