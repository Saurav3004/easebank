export const checkoutUrl = "https://checkout.razorpay.com/v1/checkout.js"
export const razorpayCallbackUrl = (txn_id) => {
    return `http://localhost:4000/api/v1/amount/payment/txn_id=${txn_id}`
}