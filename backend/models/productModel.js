import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, 
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    sizes: { type: [String], required: true }, 
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }, // ✅ auto set
  },
  {
    timestamps: true, // ✅ adds createdAt and updatedAt
  }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
