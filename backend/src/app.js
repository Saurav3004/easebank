const express = require("express");
const NotFoundError = require("./middleware/404Handling");
const ApiError = require("./utils/ApiError");
const morgan = require("morgan")
const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1",require("./router/index"))

app.get("/",(req,res) => {
    res.send('Hello World')
});

app.use("",(req,res,next) => {
    next(new ApiError(404,"Not Found"))
})

app.use(NotFoundError)


module.exports = app
