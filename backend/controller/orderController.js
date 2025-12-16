import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { startSession } from "../config/mongodb.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Gateway initialize
const currency = "inr"; // Stripe currency code for Indian Rupee
const deliveryCharge = 10;

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper function to update product quantities
const updateProductQuantities = async (items) => {
  for (const item of items) {
    if (!item.size) continue; // Skip if no size specified
    
    const product = await productModel.findById(item.productId);
    if (!product) continue;

    // Check if product has sizeQuantities
    if (product.sizeQuantities && product.sizeQuantities.length > 0) {
      const sizeIndex = product.sizeQuantities.findIndex(sq => sq.size === item.size);
      
      if (sizeIndex !== -1) {
        // Update quantity for the specific size
        product.sizeQuantities[sizeIndex].quantity -= item.quantity;
        
        // If quantity becomes zero, remove the size from the product
        if (product.sizeQuantities[sizeIndex].quantity <= 0) {
          product.sizeQuantities.splice(sizeIndex, 1);
          
          // Also remove from sizes array if it exists there
          const sizesIndex = product.sizes.indexOf(item.size);
          if (sizesIndex !== -1) {
            product.sizes.splice(sizesIndex, 1);
          }
        }
        
        await product.save();
      }
    }
  }
};

// --------------------- Place Order using COD ---------------------
const placeOrder = async (req, res) => {
  let session;
  try {
    session = await startSession();
    const { userId, items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    // Validate items have required fields
    for (const item of items) {
      if (!item.productId) {
        throw new Error("Product ID is missing from cart item");
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        throw new Error(`Invalid price for product ${item.productId}: ${item.price}`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${item.productId}: ${item.quantity}`);
      }
    }

    // First, verify all items are in stock
    for (const item of items) {
      if (!item.size) continue;
      
      const product = await productModel.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      // Check if product has sizeQuantities
      if (product.sizeQuantities && product.sizeQuantities.length > 0) {
        const sizeData = product.sizeQuantities.find(sq => sq.size === item.size);
        if (!sizeData || sizeData.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name} (Size: ${item.size})`);
        }
      }
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
    await newOrder.save({ session });

    // Update product quantities
    await updateProductQuantities(items);

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { session });

    await session.commitTransaction();
    res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

// --------------------- Place Order using Stripe ---------------------
const placeOrderStripe = async (req, res) => {
  let session;
  try {
    session = await startSession();
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    // First, verify all items are in stock
    for (const item of items) {
      if (!item.productId) {
        throw new Error("Product ID is missing from cart item");
      }
      if (!item.size) continue;
      
      const product = await productModel.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      // Check if product has sizeQuantities
      if (product.sizeQuantities && product.sizeQuantities.length > 0) {
        const sizeData = product.sizeQuantities.find(sq => sq.size === item.size);
        if (!sizeData || sizeData.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name} (Size: ${item.size})`);
        }
      }
    }

    // Validate items have required fields
    for (const item of items) {
      if (typeof item.price !== 'number' || item.price < 0) {
        throw new Error(`Invalid price for product ${item.productId}: ${item.price}`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${item.productId}: ${item.quantity}`);
      }
    }

    let amount = 0;
    items.forEach((item) => {
      amount += item.price * item.quantity;
    });
    amount += deliveryCharge;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    await session.commitTransaction();
    res.json({ success: true, session_url: stripeSession.url });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

// --------------------- Verify Stripe Payment ---------------------
const verifyStripe = async (req, res) => {
  let session;
  try {
    session = await startSession();
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId).session(session);
    
    if (!order) {
      throw new Error("Order not found");
    }
    
    if (order.payment) {
      return res.json({ success: true, message: "Payment already verified" });
    } else {
      // Payment failed - delete the order
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment cancelled" });
    }
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

// --------------------- Placeholder: Razorpay ---------------------
const placeOrderRazorpay = async (req, res) => {
  try {
    res.json({ success: false, message: "Razorpay integration not implemented yet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --------------------- Admin: Get all orders ---------------------
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --------------------- User: Get user orders ---------------------
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ success: false, message: "UserId missing" });

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// --------------------- Admin: Update order status ---------------------
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "orderId and status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};
