const AuthService = require("../service/authService");

class AuthController {
    static async loginUser(req,res){
        const res_obj = await AuthService.loginUser(req.body)
        res.status(200).send(res_obj)
    }
}

module.exports = AuthController