const express = require("express");
const router = express.Router();
const vpExpoCrmController = require("./../controllers/vpExpoCrmController");

router.get("/", vpExpoCrmController.indexView);

// REGISTRANTS
router.get("/registrants", vpExpoCrmController.getAllRegistrants);
router.get("/registrants/:id", vpExpoCrmController.getOneRegistrant);
router.put("/registrants/:id", vpExpoCrmController.updateOneRegistrant);

module.exports = router;
