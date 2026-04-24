const AmountService = require("../service/amountService")

class AmountController {
    static addMoney = async (req,res) => {
        const resObj = await AmountService.addMoney(req.body,req.user);
        res.status(200).send(resObj);
    }
    static verifyPayment = async (req,res) => {
        const resObj = await AmountService.verifyPayment(req.body,req.user);
        res.status(200).send(resObj);
    } 
};

module.exports = AmountController