// backend/routes/productRoute.js
import express from "express";
import {
  listProducts,
  singleproduct,
  removeProduct,
  addproduct
} from "../controller/productController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js"

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct);
productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single', singleproduct);
productRouter.get('/list', listProducts);


export default productRouter;
