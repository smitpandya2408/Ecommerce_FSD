import mongoose from "mongoose";

const sizeQuantitySchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0, default: 0 }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, 
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    sizes: { type: [String], required: true },
    sizeQuantities: [sizeQuantitySchema],
    bestseller: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
