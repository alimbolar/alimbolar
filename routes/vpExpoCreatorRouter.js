const express = require("express");
const router = express.Router();
const vpExpoCreatorController = require("./../controllers/vpExpoCreatorController");

router.get("/", vpExpoCreatorController.indexView);

// EXHIBITORS
router.get("/exhibitors", vpExpoCreatorController.getAllExhibitors);
router.get("/exhibitors/:id", vpExpoCreatorController.getOneExhibitor);

module.exports = router;
