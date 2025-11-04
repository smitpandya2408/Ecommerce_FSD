# Payment Flow Documentation

## 🔄 Payment Verification System

This document explains how the payment verification system works to ensure orders are only confirmed when payment is successful.

## 📋 Payment Methods

### 1. Cash on Delivery (COD)
**Flow:**
1. User selects COD payment method
2. Order is created in database with `payment: false`
3. Cart is cleared immediately (since payment will be collected on delivery)
4. User is redirected to orders page
5. Order status: "Order Placed"

**Backend:** `/api/order/place`
- Creates order with `paymentMethod: "COD"`
- Sets `payment: false` (will be updated when payment is collected)
- Clears user cart in database

---

### 2. Stripe Payment
**Flow:**
1. User selects Stripe payment method
2. Order is created in database with `payment: false` (pending verification)
3. User is redirected to Stripe checkout page
4. After payment:
   - **Success:** Redirected to `/verify?success=true&orderId=xxx`
   - **Cancel:** Redirected to `/verify?success=false&orderId=xxx`
5. Verify page calls backend verification endpoint
6. Backend verifies payment:
   - **If successful:** Updates order `payment: true`, clears cart
   - **If failed:** Deletes the order from database
7. User is redirected to appropriate page

**Backend Endpoints:**
- `/api/order/stripe` - Creates order and Stripe checkout session
- `/api/order/verifyStripe` - Verifies payment and updates order

---

## 🔐 Security Features

### 1. Authentication Required
All payment endpoints require JWT authentication:
```javascript
headers: { Authorization: `Bearer ${token}` }
```

### 2. Order Validation
- Validates user is logged in
- Checks cart has items
- Validates address information
- Validates payment method

### 3. Payment Verification
- Order created with `payment: false`
- Only marked as paid after successful verification
- Failed payments result in order deletion (no orphaned orders)

---

## 📁 File Structure

### Frontend Files
```
fronted/src/
├── pages/
│   ├── Placeorder.jsx    # Order placement form
│   └── Verify.jsx        # Payment verification page
└── context/
    └── ShopContent.jsx   # Cart management
```

### Backend Files
```
backend/
├── controller/
│   └── orderController.js  # Order & payment logic
├── routes/
│   └── orderRoutes.js      # Order API routes
└── models/
    └── orderModel.js       # Order schema
```

---

## 🎯 Key Features

### ✅ Order Only Created on Successful Payment
- **COD:** Order created immediately (payment on delivery)
- **Stripe:** Order created but marked as unpaid until verification
- **Failed Payments:** Order is deleted, cart remains intact

### ✅ Cart Management
- Cart cleared only after successful order placement
- Failed payments keep cart intact for retry
- Backend and frontend cart sync

### ✅ User Experience
- Loading states during payment processing
- Clear success/error messages
- Automatic redirects
- Order tracking page

---

## 🔄 Payment Flow Diagram

### Stripe Payment Flow
```
User clicks "Place Order"
        ↓
Order created (payment: false)
        ↓
Redirect to Stripe Checkout
        ↓
    User Pays
        ↓
    ┌─────────┴─────────┐
    ↓                   ↓
Success             Cancel
    ↓                   ↓
/verify?success=true  /verify?success=false
    ↓                   ↓
Backend Verification
    ↓                   ↓
payment: true      Delete Order
Clear Cart         Keep Cart
    ↓                   ↓
/orders page       /cart page
```

---

## 🛠️ API Endpoints

### User Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/order/place` | ✅ | Place COD order |
| POST | `/api/order/stripe` | ✅ | Create Stripe checkout |
| POST | `/api/order/verifyStripe` | ✅ | Verify Stripe payment |
| POST | `/api/order/userorders` | ✅ | Get user's orders |

### Admin Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/order/allorders` | 🔐 Admin | Get all orders |
| POST | `/api/order/status` | 🔐 Admin | Update order status |

---

## 📝 Order Model Schema

```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String (default: "Order Placed"),
  paymentMethod: String ("COD" | "Stripe" | "Razorpay"),
  payment: Boolean (default: false),
  date: Number
}
```

---

## 🧪 Testing the Payment Flow

### Test COD Payment
1. Add items to cart
2. Go to checkout
3. Fill delivery information
4. Select "Cash on Delivery"
5. Click "Place Order"
6. ✅ Order should be created
7. ✅ Cart should be cleared
8. ✅ Redirected to orders page

### Test Stripe Payment (Success)
1. Add items to cart
2. Go to checkout
3. Fill delivery information
4. Select "Stripe"
5. Click "Place Order"
6. Complete Stripe checkout
7. ✅ Redirected to verify page
8. ✅ Order marked as paid
9. ✅ Cart cleared
10. ✅ Redirected to orders page

### Test Stripe Payment (Cancel)
1. Add items to cart
2. Go to checkout
3. Fill delivery information
4. Select "Stripe"
5. Click "Place Order"
6. Cancel Stripe checkout
7. ✅ Redirected to verify page
8. ✅ Order deleted from database
9. ✅ Cart remains intact
10. ✅ Redirected to cart page

---

## 🚨 Error Handling

### Common Errors
- **401 Unauthorized:** User not logged in
- **400 Bad Request:** Missing required fields
- **404 Not Found:** Order not found
- **500 Server Error:** Database or payment gateway error

### Error Messages
- Clear, user-friendly error messages
- Toast notifications for all errors
- Console logging for debugging

---

## 🔮 Future Enhancements

1. **Webhook Support**
   - Stripe webhooks for real-time updates
   - Handle payment disputes

2. **Order Status Updates**
   - Email notifications
   - SMS notifications
   - Real-time status tracking

3. **Payment History**
   - Transaction logs
   - Refund management
   - Invoice generation

---

## 📞 Support

For issues or questions about the payment system:
1. Check console logs for errors
2. Verify environment variables are set
3. Test with Stripe test cards
4. Review this documentation

---

**Last Updated:** November 4, 2025
**Version:** 1.0.0
