import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContent";
import Title from "./Title";
import Productitem from "./Productitem";

const BestSaller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => item.bestseller);
    setbestseller(bestproduct.slice(0, 5));
  }, []);

  return (
  <div className="my-10">
  <div className="text-center text-3xl py-8">
    <Title text1={'BEST'} text2={'SALLERS'}/>
    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Explore our handpicked selection of the season’s freshest arrivals. From stylish fashion essentials to must-have accessories, our latest collections are crafted to elevate your everyday look. Whether you're refreshing your wardrobe or shopping for gifts, we’ve got something new for everyone.
    </p>
  </div>
<div className='grid grid-cols-2 sm:text-sm md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
  {
    bestseller.map((item, index) => (
      <Productitem 
        key={index} 
        id={item._id} 
        name={item.name} 
        image={item.image} 
        price={item.price} 
      />
    ))
  }
</div>

  </div>);
};

export default BestSaller;
