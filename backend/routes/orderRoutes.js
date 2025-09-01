import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controller/orderController.js'
import express from 'express'

import adminAuth from '../middleware/adminAuth.js'
import authuser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/Stripe',authuser,placeOrderStripe)
orderRouter.post('/razorpay',authuser,placeOrderRazorpay)

//user features
orderRouter.post('/userorders',authuser,userOrders)

export default orderRouter