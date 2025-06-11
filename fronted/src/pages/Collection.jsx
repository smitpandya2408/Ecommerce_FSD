import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContent"; // ✅ named import
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem"; // ✅ assumed correct path

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showfilter, setshowfilter] = useState(false);
  const [filterproduct, setfilterproduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setsubcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setsubcategory((prev) => [...prev, value]);
    }
  };
  const applyFilter = () => {
    let productCopy = products.slice();

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subcategory.includes(item.subcategory)
      );
    }

    setfilterproduct(productCopy);
  };

  useEffect(() => {
    setfilterproduct(products);
  }, [products]);
  useEffect(() => {
    applyFilter();
  }, [category, subcategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setshowfilter(!showfilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Category</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Subcategory filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCategory}
              />
              BottomWear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low To High</option>
            <option value="high-low">Sort By: High To Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterproduct.map((item, index) => (
            <Productitem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
