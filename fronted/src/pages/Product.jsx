import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContent";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";


const Product = () => {
  const { productid } = useParams();
  const { products, currency, addtocart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setsize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productid);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productid, products]);

  if (!productData) return null;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2"></p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 bg-gray-400 ${
                    item === size ? "border-red-100" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addtocart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex gap-4">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">Review(122)</b>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            At [YourBrand], we bring you a seamless and enjoyable shopping
            experience with a curated selection of high-quality products for
          </p>
          <p>
            every lifestyle. From the latest fashion trends and stylish
            accessories to home essentials and electronics, we’ve got everything
            you need — all in one place.
          </p>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
