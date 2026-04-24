const { body } = require("express-validator");

class AmountValidation {
    static addMoney = [
        body('amount').isNumeric().notEmpty().withMessage("Amount is required"),
        body('account_no').isString().notEmpty().withMessage("Account no is required").isMongoId().notEmpty().withMessage("Account number is required")
    ]
};

module.exports = AmountValidation;