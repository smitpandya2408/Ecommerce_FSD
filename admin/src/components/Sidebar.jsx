import React from 'react';
import { NavLink } from 'react-router-dom';
import addicon from '../assets/assets/add_icon.png';
import ordericon from '../assets/assets/order_icon.png';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-6 pr-6 text-[15px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100 transition ${
              isActive ? 'active' : ''
            }`
          }
        >
          <img src={addicon} alt="Add Icon" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100 transition ${
              isActive ? 'active' : ''
            }`
          }
        >
          <img src={ordericon} alt="List Icon" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-100 transition ${
              isActive ? 'active' : ''
            }`
          }
        >
          <img src={ordericon} alt="Orders Icon" className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
