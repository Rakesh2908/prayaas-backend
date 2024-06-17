// controllers/checkout.js

import axios from 'axios';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Volunteer } from '../models/volunteer.js';

const razorpay = new Razorpay({
  key_id: "rzp_test_0hJgyaGV33UIoz",
  key_secret: "HA9w4dpYnGFnXciAFmNyGOwH",
});

export const checkout = async (req, res) => {
  try {
    const { amount, name, email, message } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: crypto.randomBytes(12).toString("hex"),
    };

    const order = await razorpay.orders.create(options);

    await Volunteer.create({
      name,
      email,
      amount,
      orderId: order.id, // Save the order.id in the Volunteer document
      paymentStatus: 'created',
    });

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Volunteer.findOneAndUpdate({ orderId: razorpay_order_id }, { paymentStatus: 'paid' });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};