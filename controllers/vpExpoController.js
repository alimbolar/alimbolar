const axios = require("axios");
const vpExpoController = {};

const Registrant = require("../models/registrantModel");
const Exhibitor = require("../models/exhibitorModel");
const zohoController = require("../controllers/zohoController");

vpExpoController.indexView = function (req, res, next) {
  res.send("<h1>Hello World</h1>");
};

// ADD REGISTRATION TO MONGO

vpExpoController.addOneRegistrant = async function (req, res, next) {
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

vpExpoController.getOneRegistrant = async function (req, res, next) {
  try {
    const crmToken = await zohoController.getAccessTokenForCrm();
    const id = req.params.id;

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_REGISTRANTS_URL_FOR_CRM}/${id}`;
    // console.log("url", url);

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${crmToken.token}`,
      },
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

vpExpoController.getAllRegistrants = async function (req, res, next) {
  try {
    const crmToken = await zohoController.getAccessTokenForCrm();

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_REGISTRANTS_URL_FOR_CRM}?fields=Last_Name,First_Name,Email`;
    console.log("url", url);

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${crmToken.token}`,
      },
    });

    res.status(200).json({
      status: "success",
      result: Object.keys(data.data).length,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// ADD EXHIBITOR TO MONGO

vpExpoController.addOneExhibitor = async function (req, res, next) {
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

vpExpoController.getAllExhibitors = async function (req, res, next) {
  try {
    const creatorToken = await zohoController.getAccessTokenForCreator();

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_EXHIBITORS_URL_FOR_CREATOR}`;
    // console.log("url", url);

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${creatorToken.token}`,
      },
    });

    res.status(200).json({
      status: "success",
      result: Object.keys(data.data).length,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

vpExpoController.getOneExhibitor = async function (req, res, next) {
  try {
    const creatorToken = await zohoController.getAccessTokenForCreator();
    const id = req.params.id;

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_EXHIBITORS_URL_FOR_CREATOR}/${id}`;
    // console.log("url", url);

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${creatorToken.token}`,
      },
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = vpExpoController;
