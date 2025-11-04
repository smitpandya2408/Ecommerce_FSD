# E-Commerce Full Stack Application

A complete e-commerce platform built with MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, product management, shopping cart, and payment integration.

## 🚀 Features

### User Features
- User registration and authentication with JWT
- Browse products by category and subcategory
- Search and filter products
- Add products to cart with size selection
- Multiple payment methods (COD, Stripe, Razorpay)
- Order tracking and history
- Responsive design with Tailwind CSS

### Admin Features
- Admin authentication
- Add/Remove products with multiple images
- Cloudinary integration for image storage
- View all orders
- Update order status
- Product management dashboard

## 📁 Project Structure

```
Ecommerce_fsd/
├── backend/           # Node.js + Express API
│   ├── config/        # Database & Cloudinary config
│   ├── controller/    # Route controllers
│   ├── middleware/    # Auth & file upload middleware
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   └── uploads/       # Temporary file storage
├── fronted/           # React customer frontend
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── admin/             # React admin panel
    └── src/
        ├── components/
        └── pages/
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Stripe account (for payment integration)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run server
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd fronted
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000
```

4. Start the development server:
```bash
npm run dev
```

### Admin Panel Setup

1. Navigate to admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/single` - Get single product
- `POST /api/product/add` - Add product (Admin only)
- `POST /api/product/remove` - Remove product (Admin only)

### Cart Routes
- `POST /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart quantity

### Order Routes
- `POST /api/order/place` - Place order (COD)
- `POST /api/order/stripe` - Place order (Stripe)
- `POST /api/order/razorpay` - Place order (Razorpay)
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/allorders` - Get all orders (Admin only)
- `POST /api/order/status` - Update order status (Admin only)

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🐛 Recent Fixes

1. **Authentication Headers**: Fixed mismatch between frontend and backend authentication headers. Now using standard `Authorization: Bearer <token>` format.

2. **Multer Configuration**: Added proper destination folder and unique filename generation for file uploads.

3. **Admin Order Endpoint**: Corrected API endpoint from `/api/order/list` to `/api/order/allorders`.

4. **Admin Authentication**: Added admin authentication middleware to admin-only routes for enhanced security.

5. **Environment Validation**: Added validation for required environment variables on server startup.

6. **Error Handling**: Improved error handling in MongoDB connection and API responses.

## 📝 Usage

### Running All Services

1. Start MongoDB (if using local instance)
2. Start backend: `cd backend && npm start`
3. Start frontend: `cd fronted && npm run dev`
4. Start admin panel: `cd admin && npm run dev`

### Default Ports
- Backend API: http://localhost:4000
- Frontend: http://localhost:5173 (or as assigned by Vite)
- Admin Panel: http://localhost:5174 (or as assigned by Vite)

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable CORS only for trusted domains in production
- Use HTTPS in production
- Regularly update dependencies

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- cloudinary - Image storage
- multer - File upload handling
- stripe - Payment processing
- cors - Cross-origin resource sharing
- dotenv - Environment variables

### Frontend & Admin
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- react-toastify - Notifications
- tailwindcss - Styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Smit Pandya

## 🙏 Acknowledgments

- MongoDB for database
- Cloudinary for image hosting
- Stripe for payment processing
- Tailwind CSS for styling
