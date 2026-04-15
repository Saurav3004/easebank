const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth")

const routes = [{
    path:"/auth",
    route:AuthRouter
}];

routes.forEach((cur) => {
    router.use(cur.path,cur.route)
})

module.exports = router;