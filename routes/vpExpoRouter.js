const express = require("express");
const router = express.Router();
const vpExpoController = require("./../controllers/vpExpoController");

router.get("/", vpExpoController.indexView);
router.post("/addRegistration", vpExpoController.addRegistration);

module.exports = router;
