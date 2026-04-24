const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_TEST_KEY,
    key_secret:process.env.RAZORPAY_TEST_SECRET
});

exports.NewRazorpay = razorpay;