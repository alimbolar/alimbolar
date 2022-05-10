const path = require("path");
const express = require("express");
const app = express();
const mailRouter = require("./routes/mailRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/v1/mail", mailRouter);

module.exports = app;
