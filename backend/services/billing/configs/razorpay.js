import Razorpay from "razorpay";

import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
