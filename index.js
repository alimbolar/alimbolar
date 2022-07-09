const path = require("path");
const express = require("express");
const app = express();
// const mailRouter = require("./routes/mailRouter");
const vpExpoCrmRouter = require("./routes/vpExpoCrmRouter");
const vpExpoCreatorRouter = require("./routes/vpExpoCreatorRouter");
const vpExpoMongoRouter = require("./routes/vpExpoMongoRouter");
const vpExpoFirebaseRouter = require("./routes/vpExpoFirebaseRouter");

const zohoRouter = require("./routes/zohoRouter");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

// app.use("/api/v1/mails", mailRouter);
app.use("/api/vpexpo/crm/v1", vpExpoCrmRouter);
app.use("/api/vpexpo/creator/v1", vpExpoCreatorRouter);
app.use("/api/vpexpo/mongo/v1", vpExpoMongoRouter);
app.use("/api/vpexpo/firebase/v1", vpExpoFirebaseRouter);

app.use("/api/vpexpo/v1", zohoRouter);

module.exports = app;
