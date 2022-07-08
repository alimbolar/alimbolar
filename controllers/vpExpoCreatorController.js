const axios = require("axios");
const vpExpoCreatorController = {};

const zohoController = require("../controllers/zohoController");

vpExpoCreatorController.indexView = function (req, res, next) {
  res.send("<h1>Hello World from Creator Controller</h1>");
};

// GET ALL EXHIBITORS

vpExpoCreatorController.getAllExhibitors = async function (req, res, next) {
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

// GET ONE EXHIBITOR

vpExpoCreatorController.getOneExhibitor = async function (req, res, next) {
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

module.exports = vpExpoCreatorController;
