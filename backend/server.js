const {config} = require("dotenv");
config({
    path:".env"
});

const app = require("./src/app");
const { connectDB } = require("./src/config/db.config");

const port = process.env.port || 8000;
connectDB()

app.listen(port,() => {
    console.log(`app is running on port: ${port}`);
})