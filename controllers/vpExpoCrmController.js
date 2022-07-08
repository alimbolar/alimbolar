const axios = require("axios");
const vpExpoCrmController = {};

const zohoController = require("../controllers/zohoController");
const { update } = require("../models/exhibitorModel");

vpExpoCrmController.indexView = function (req, res, next) {
  res.send("<h1>Hello World from CRM Controller</h1>");
};

// GET ALL REGISTRANTS

vpExpoCrmController.getAllRegistrants = async function (req, res, next) {
  try {
    const query = req.query;
    let queryString = "?";
    // console.log(query);
    Object.entries(query).map(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    queryString = queryString.slice(0, -1);

    const crmToken = await zohoController.getAccessTokenForCrm();

    // Create URL with queryString appended for fetching data
    const url = `${process.env.ZOHO_REGISTRANTS_URL_FOR_CRM}`.concat(
      queryString
    );
    console.log("url", url);

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${crmToken.token}`,
      },
    });

    res.status(200).json({
      status: "success",
      query,
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

// GET ONE REGISTRANT FROM CRM

vpExpoCrmController.getOneRegistrant = async function (req, res, next) {
  try {
    const query = req.query;
    let queryString = "?";
    // console.log(query);
    Object.entries(query).map(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    queryString = queryString.slice(0, -1);

    const crmToken = await zohoController.getAccessTokenForCrm();
    const id = req.params.id;

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_REGISTRANTS_URL_FOR_CRM}/${id}`.concat(
      queryString
    );
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

// GET ONE REGISTRANT FROM CRM

vpExpoCrmController.updateOneRegistrant = async function (req, res, next) {
  try {
    const crmToken = await zohoController.getAccessTokenForCrm();
    const id = req.params.id;

    // Create URL with id appended for fetching data
    const url = `${process.env.ZOHO_REGISTRANTS_URL_FOR_CRM}/${id}`;

    console.log("url", url);

    // Create data object to update
    const updatedRegistrant = req.body;

    const { data } = await axios.put(url, updatedRegistrant, {
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

module.exports = vpExpoCrmController;
