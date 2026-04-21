const { UserModel } = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const bcryptjs = require("bcryptjs");
const JWTService = require("../utils/JwtService");
const { AccountModel } = require("../models/AccountModel");
const { TransactionModel } = require("../models/TransactionModel");

class AuthService {
    static async loginUser(body){
        const {email,password} = body;
        const user = await UserModel.findOne({email:email.toLowerCase()});
        if(!user){
            throw new ApiError(400,"User not found")
        }

        const isPasswordValid = await bcryptjs.compare(password,user.password);
        if(!isPasswordValid){
            throw new ApiError(400,"Invalid credentials")
        }

        const token = JWTService.generateToken(user._id)
        return {
            msg:"Login success",
            token:token
        }

    }

    static async registerUser(body){
        const {name,email,password,account_type} = body;

        const exist_user = await UserModel.findOne({email:email.toLowerCase()});
        if(exist_user){
            throw new ApiError(400,"Email Already Registered")
        }
        const user = await UserModel.create({
            name,
            email,
            password,
            account_type
        })
        const token = JWTService.generateToken(user._id)
        return {
            msg:"Register Success",
            token: token
        };
    }

    static async getProfile(user){
        const userProfile = await UserModel.findById(user).select("-password -_id");

        const profileObj = {}

        const account = await AccountModel.findOne({user});

        if(!account){
           const ac = await AccountModel.create({
                user,
                amount:0
            });
            await TransactionModel.create({
                account:ac._id,
                amount:0,
                type:"credit",
                isSuccess:true,
                remark:"Account opening"
            })

            profileObj['account_no'] = ac._id
            profileObj['amount'] = ac.amount
        }

        profileObj['account_no'] = account._id
        profileObj['amount'] = account.amount
        
        if(!userProfile){
            throw new ApiError(401,"Profile, Not Found")
        }
        return {...userProfile.toObject(),...profileObj}
    }
}

module.exports = AuthService;