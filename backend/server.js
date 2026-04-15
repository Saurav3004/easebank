const {config} = require("dotenv");
config({
    path:".env"
});

const app = require("./src/app");

const port = process.env.port || 8000;

app.listen(port,() => {
    console.log(`app is running on port: ${port}`);
})