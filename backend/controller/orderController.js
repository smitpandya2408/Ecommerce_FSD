import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Place order using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    let amount = 0;
    items.forEach((item) => {
      amount += item.price * item.quantity;
    });

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placeholder: Stripe
const placeOrderStripe = async (req, res) => {
  try {
    res.json({ success: false, message: "Stripe integration not implemented yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placeholder: Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    res.json({ success: false, message: "Razorpay integration not implemented yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User: Get orders by userId (GET request)
const userOrders = async (req, res) => {
  try {
    const userId = req.body.userId; // auth middleware injects this
    if (!userId)
      return res.status(400).json({ success: false, message: "UserId missing" });

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    res.json({ success: false, message: "Update status not implemented yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };
