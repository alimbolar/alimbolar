const express = require("express");
const router = express.Router();
const vpExpoMongoController = require("./../controllers/vpExpoMongoController");

router.get("/", vpExpoMongoController.indexView);

// REGISTRANTS
router.post("/registrants", vpExpoMongoController.addOneRegistrant);

// EXHIBITORS
router.post("/exhibitors", vpExpoMongoController.addOneExhibitor);

module.exports = router;
