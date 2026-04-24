const { TransactionModel } = require("../models/TransactionModel")
const { NewRazorpay } = require("../utils/Razorpay")

class AmountService {
    static async addMoney(body,user){
      const transaction =  await TransactionModel.create({
            account: body.account_no,
            user:user,
            amount:parseInt(body.amount),
            type:"credit"
        })
        const options ={
            amount:parseInt(body.amount)*100,
            currency: "INR",
            receipt: transaction._id
        }

        const order = await NewRazorpay.orders.create(options);
        console.log(order)

        return {
            order_id: order.id,
            txn_id: transaction._id
        }
    }

    static async verifyPayment(body){
        console.log(body)
        return body;
    }
}

module.exports = AmountService