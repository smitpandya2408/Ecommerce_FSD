import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controller/orderController.js';
import express from 'express';

import adminAuth from '../middleware/adminAuth.js';
import authuser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features (user routes)
orderRouter.post('/place', authuser, placeOrder);
orderRouter.post('/Stripe', authuser, placeOrderStripe);
orderRouter.post('/razorpay', authuser, placeOrderRazorpay);

// User orders
orderRouter.post('/userorders', authuser, userOrders);

export default orderRouter;
