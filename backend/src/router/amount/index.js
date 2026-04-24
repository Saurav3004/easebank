const express = require("express");
const AmountValidation = require("../../validations/AmountValidation");
const validationMiddleware = require("../../middleware/validationMiddleware");
const AuthMiddleware = require("../../middleware/authMiddleware");
const AmountController = require("../../controller/amountController");
const router = express.Router();

router.post("/add-money",AuthMiddleware,AmountValidation.addMoney,validationMiddleware,AmountController.addMoney);

router.post("/payment/txn_id",AmountController.verifyPayment)

module.exports = router;