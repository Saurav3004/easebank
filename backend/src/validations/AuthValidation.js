const { body } = require("express-validator")

class AuthValidation{
    static registerUser=[
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is Required"),
        body("account_type").notEmpty().withMessage("Account Type is Required").isIn(["saving","current"]).withMessage("Account should be valid saving, or current account")
    ]

    static loginUser=[
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is Required"),
    ]
}

module.exports = AuthValidation;
