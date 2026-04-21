const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Account"
    },
    amount:{
        type:Number,
        required:true
    },
    isSuccess:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        enum: ["credit","debit"],
        required:true
    },
    razorpayPaymentId:{
        type:String,
        default:""
    },
    razorpayOrderId:{
        type:String,
        default:""
    },
    razorpaySignature:{
        type:String,
        default:""
    },
    remark:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

const model = mongoose.model("Transaction",transactionSchema);
exports.TransactionModel = model;