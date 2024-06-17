// router/checkoutRouter.js
import express from "express";
import { checkout, paymentVerification } from "../controllers/checkout.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/payment-verification", paymentVerification);

export default router;
