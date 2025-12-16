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
      sizeQuantities,
      bestseller,
    } = req.body;

    // Handle uploaded images (multer)
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

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

    // ✅ Parse sizes properly
    let parsedSizes = [];
    if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    } else if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes); // if frontend sends JSON string
      } catch {
        parsedSizes = [sizes]; // fallback if simple string
      }
    }

    // Parse sizeQuantities if it's a string
    let parsedSizeQuantities = [];
    try {
      parsedSizeQuantities = typeof sizeQuantities === 'string' 
        ? JSON.parse(sizeQuantities) 
        : sizeQuantities || [];
    } catch (e) {
      console.error('Error parsing sizeQuantities:', e);
      parsedSizeQuantities = [];
    }

    // Filter out sizes with quantity > 0
    const validSizes = parsedSizeQuantities
      .filter(item => item.quantity > 0)
      .map(item => item.size);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: validSizes.length > 0 ? validSizes : parsedSizes,
      sizeQuantities: parsedSizeQuantities.filter(item => item.quantity > 0),
      image: imageurl,
      date: Date.now(),
    };

    console.log("Product Data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products }); // ✅ plural for list
  } catch (error) {
    console.error("List Products Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ❗ Optional: remove product images from Cloudinary
    // for (const url of product.image) {
    //   const publicId = url.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(publicId);
    // }

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Remove Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to fetch a single product
const singleproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Single Product Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, singleproduct, removeProduct, addproduct };
