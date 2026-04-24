const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth")
const AmountRouter = require("./amount")

const routes = [{
    path:"/auth",
    route:AuthRouter
},{
    path:"/amount",
    route:AmountRouter
}];

routes.forEach((cur) => {
    router.use(cur.path,cur.route)
})

module.exports = router;