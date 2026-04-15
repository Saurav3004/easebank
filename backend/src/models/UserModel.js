const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lower:true
    },
    password:{
        type:String,
        required:true,
    },
    account_type:{
        type:String,
        required:true,
        enum:["saving","current"],
        default:"saving"
    }
},{
    timestamps:true
});

userSchema.pre("save",async function(){
    const user = this;
    if(user.isModified("password")){
        this.password = await bcryptjs.hash(user.password,10)
    }
})

const model = mongoose.model("User",userSchema);
exports.UserModel = model;