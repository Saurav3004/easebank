const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB Connected successfully: ${mongoose.connection.host}`)
    } catch (error) {
        mongoose.disconnect();
        process.exit(1);
    }
}