import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//function for add product
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

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image2[0];
    const image4 = req.files.image4 && req.files.image2[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageurl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      size: JSON.parse(sizes),
      image: imageurl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    );
    console.log(imageurl);

    res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for list product
const listProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for add product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product info
const singleproduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, singleproduct, removeProduct, addproduct };
