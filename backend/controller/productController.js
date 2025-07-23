import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add product
const addproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Handle uploaded images
    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to Cloudinary
    const imageurl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ✅ Parse sizes properly (can be string or array)
    let parsedSizes = [];
    if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    } else if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes); // from frontend formdata
      } catch (err) {
        parsedSizes = [sizes]; // fallback
      }
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes, // ✅ FIXED key and safe parse
      image: imageurl,
      date: Date.now(),
    };

    console.log("Product Data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.json({ success: true, product });
  } catch (error) {
    console.error("List Products Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Remove Product Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to fetch a single product
const singleproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Single Product Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, singleproduct, removeProduct, addproduct };
