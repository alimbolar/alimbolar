const express = require("express");
const router = express.Router();
const vpExpoController = require("./../controllers/vpExpoController");

router.get("/", vpExpoController.indexView);
router.post("/registrants", vpExpoController.addOneRegistrant);
router.post("/exhibitors", vpExpoController.addOneExhibitor);

module.exports = router;
