const vpExpoController = {};

const User = require("../models/registrationModel");

vpExpoController.indexView = function (req, res, next) {
  res.send("<h1>Hello World</h1>");
};

// ADD REGISTRATION TO MONGO

vpExpoController.addOneRegistrant = async function (req, res, next) {
  try {
    console.log(req.body);
    console.log(req.body.data);

    const user = await User.create(req.body.data);

    res.status(200).json({
      status: "success",
      user,
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

vpExpoController.addOneExhibitor = async function (req, res, next) {
  try {
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

module.exports = vpExpoController;
