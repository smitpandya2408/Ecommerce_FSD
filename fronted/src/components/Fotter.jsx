import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
  return (
    <div className="px-5">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-14 my-10 mt-40 text-sm items-start">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Explore our handpicked selection of the season’s freshest arrivals.
            From stylish fashion essentials to must-have accessories, our latest
            collections are crafted to elevate your everyday look. Whether
            you're refreshing your wardrobe or shopping for gifts, we’ve got
            something new for everyone.
          </p>
        </div>

        <div className="text-right sm:text-left">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-700">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get In TOuch</p>
          <ul className="flex flex-col gap-1 text-gray-700">
            <li>+91 7069297337</li>
            <li>Contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className='text-gray-4  00'/>
        <p className="py-5 text-sm text-center">CopyRight 2025@ forever.com -All Rights Are reserved</p>
      </div>
    </div>
  );
}

export default Footer;
