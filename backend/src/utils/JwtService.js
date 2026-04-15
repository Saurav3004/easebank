const jwt = require("jsonwebtoken");

class JWTService {
    static generateToken(user){
        const token = jwt.sign({user},process.env.JWT_SECRET,{
            algorithm:"HS256",
            expiresIn:"1d"
        })
        return token;
    }
    static verifyToken(token){
        const data = jwt.verify(token,process.env.JWT_SECRET);
        return data;
    }
}

module.exports = JWTService