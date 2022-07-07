const path = require("path");
const express = require("express");
const app = express();
// const mailRouter = require("./routes/mailRouter");
const vpExpoRouter = require("./routes/vpExpoRouter");
const zohoRouter = require("./routes/zohoRouter");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

// app.use("/api/v1/mails", mailRouter);
app.use("/api/vpexpo/v1", vpExpoRouter);
app.use("/api/vpexpo/v1", zohoRouter);

module.exports = app;
