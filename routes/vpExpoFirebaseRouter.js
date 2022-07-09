const express = require("express");
const router = express.Router();

vpExpoFirebaseController = require("./../controllers/vpExpoFirebaseController");

router.post(
  "/createUser",
  vpExpoFirebaseController.doCreateUserWithEmailAndPassword
);

module.exports = router;
