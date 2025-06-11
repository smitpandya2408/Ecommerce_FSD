import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div className='flex flex-col items-center'>
        <img src={assets.exchange_icon} className='w-12 mb-5' alt='Exchange Icon'/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange policy</p>
      </div>

      <div className='flex flex-col items-center'>
        <img src={assets.quality_icon} className='w-12 mb-5' alt='Exchange Icon'/>
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 Days free return policy</p>
      </div>

      <div className='flex flex-col items-center'>
        <img src={assets.support_img} className='w-12 mb-5' alt='Exchange Icon'/>
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 Customer Support</p>
      </div>


    </div>
  );
}

export default OurPolicy;
