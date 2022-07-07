const express = require("express");
const router = express.Router();
const vpExpoController = require("./../controllers/vpExpoController");

router.get("/", vpExpoController.indexView);

// REGISTRANTS
router.post("/registrants", vpExpoController.addOneRegistrant);
router.get("/registrants/:id", vpExpoController.getOneRegistrant);

// EXHIBITORS
router.post("/exhibitors", vpExpoController.addOneExhibitor);

module.exports = router;
