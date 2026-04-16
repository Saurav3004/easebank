const { UserModel } = require("../models/UserModel");
const ApiError = require("../utils/ApiError");
const bcryptjs = require("bcryptjs");
const JWTService = require("../utils/JwtService");

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
        return {
            msg:"Register Success"
        };
    }

    static async getProfile(user){
        console.log(user)
        const userProfile = await UserModel.findById(user).select("-password -_id")
        if(!userProfile){
            throw new ApiError(401,"Profile, Not Found")
        }
        return userProfile
    }
}

module.exports = AuthService;