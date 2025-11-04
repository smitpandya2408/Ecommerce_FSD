// routes/orderRoutes.js
import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
} from "../controller/orderController.js";
import authuser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// ✅ Protected routes
orderRouter.post("/place", authuser, placeOrder);
orderRouter.post("/stripe", authuser, placeOrderStripe);
orderRouter.post("/verifyStripe", authuser, verifyStripe);
orderRouter.post("/userorders", authuser, userOrders);

// ✅ Admin routes
orderRouter.post("/allorders", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
