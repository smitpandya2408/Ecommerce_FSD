import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config(); // Load environment variables

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB & Cloudinary
connectDB();
connectCloudinary(); // Make sure your cloudinary.js file exports this properly

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded images

// API Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
