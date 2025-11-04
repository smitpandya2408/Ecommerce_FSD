import React from 'react';
import logo from '../assets/assets/logo.png'; // ✅ Directly import the image

const Navbar = ({setToken}) => {
  return (
    <div className='flex flex-items-center py-2 px-[4%] justify-between '>
      <img src={logo} alt="Logo" className='w-[max(10%,80px)]'/>
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LogOut</button>
    </div>
  );
};

export default Navbar;
