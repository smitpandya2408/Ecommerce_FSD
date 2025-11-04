import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContent'; 
import Title from './Title';
import Product from '../pages/Product';
import Productitem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const[latestproduct,setlatestproduct]=useState([])

  useEffect(()=>{setlatestproduct(products.slice(0,10))},[products])
  

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Explore our handpicked selection of the season’s freshest arrivals. From stylish fashion essentials to must-have accessories, our latest collections are crafted to elevate your everyday look. Whether you're refreshing your wardrobe or shopping for gifts, we’ve got something new for everyone.</p>
        </div>
        
        {/*Rendering products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestproduct.map((item,index)=>(
                <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            )

            )
        }
        </div>

     </div>
  );
};

export default LatestCollection;
