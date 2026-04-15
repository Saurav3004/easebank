const express = require("express");
const AuthController = require("../../controller/authController");
const AuthValidation = require("../../validations/AuthValidation");
const validationMiddleware = require("../../middleware/validationMiddleware");
const AuthMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.route("/login").post(AuthValidation.loginUser,validationMiddleware,AuthController.loginUser);
router.route("/register").post(AuthValidation.registerUser,validationMiddleware,AuthController.registerUser);

router.route("/profile").get(AuthMiddleware,AuthController.userProfile)

module.exports = router;