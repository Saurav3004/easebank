const express = require("express");
const AuthController = require("../../controller/authController");
const router = express.Router();

router.route("/login").get(AuthController.loginUser);

module.exports = router;