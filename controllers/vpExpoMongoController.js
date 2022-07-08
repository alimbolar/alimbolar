const axios = require("axios");
const vpExpoMongoController = {};

const Registrant = require("../models/registrantModel");
const Exhibitor = require("../models/exhibitorModel");
const zohoController = require("../controllers/zohoController");

vpExpoMongoController.indexView = function (req, res, next) {
  res.send("<h1>Hello World from Mongo Controller</h1>");
};

// ADD REGISTRATION TO MONGO

vpExpoMongoController.addOneRegistrant = async function (req, res, next) {
  try {
    const registrantId = req.body.data.registrantId;
    const exists = await Registrant.findOne({ registrantId });
    if (exists) throw new Error("Registrant exists");

    const registrant = await Registrant.create(req.body.data);

    res.status(200).json({
      status: "success",
      registrant,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

// ADD EXHIBITOR TO MONGO

vpExpoMongoController.addOneExhibitor = async function (req, res, next) {
  try {
    const exhibitorId = req.body.data.exhibitorId;
    const exists = await Exhibitor.findOne({ exhibitorId });
    if (exists) throw new Error("Exhibitor Exists");

    const exhibitor = await Exhibitor.create(req.body.data);

    res.status(200).json({
      status: "success",
      exhibitor,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

module.exports = vpExpoMongoController;
