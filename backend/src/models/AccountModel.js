const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    amount:{
        type: Number,
        default: 0,
    },
},{
    timestamps:true
});

const model = mongoose.model("Account",accountSchema);
exports.AccountModel = model;