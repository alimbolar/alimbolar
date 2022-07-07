const express = require("express");
const router = express.Router();
const vpExpoController = require("./../controllers/vpExpoController");

router.get("/", vpExpoController.indexView);

// REGISTRANTS
router.post("/registrants", vpExpoController.addOneRegistrant);
router.get("/registrants", vpExpoController.getAllRegistrants);
router.get("/registrants/:id", vpExpoController.getOneRegistrant);

// EXHIBITORS
router.post("/exhibitors", vpExpoController.addOneExhibitor);
router.get("/exhibitors", vpExpoController.getAllExhibitors);
router.get("/exhibitors/:id", vpExpoController.getOneExhibitor);

module.exports = router;
