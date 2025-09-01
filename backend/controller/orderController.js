import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

// placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    // ✅ calculate amount in backend (safe)
    let amount = 0;
    items.forEach((item) => {
      amount += item.price * item.quantity;
    });

    const orderData = {
      userId,
      items,
      address,
      amount,                  // ✅ required field now filled
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ clear user cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

};

// All orders data for admin panel
const allOrders = async (req, res) => {

};

// user Order Data For Frontend
const userOrders = async (req, res) => {

};

// update order status from admin panel
const updateStatus = async (req, res) => {

};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }
