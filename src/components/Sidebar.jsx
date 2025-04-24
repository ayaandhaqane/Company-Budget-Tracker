import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaMoneyBillWave, FaFileInvoice, FaChartBar, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <div className="w-80 bg-gray-800 text-white min-h-screen p-6 fixed top-0 left-0">
      {/* Logo */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold tracking-wide text-white">
          <span className="text-green-500">Budget</span> Tracker 
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-6">
        {/* Dashboard Overview */}
        <li className="transition-all duration-300 hover:scale-105">
          <Link to="/dashboard" className="text-white hover:text-green-300 flex items-center py-3 px-6 rounded-lg text-lg font-medium w-full">
            <FaHouse className="mr-4 text-2xl" />
            Dashboard Overview
          </Link>
        </li>

        {/* Expense Management */}
        <li className="transition-all duration-300 hover:scale-105">
          <Link to="/expenses" className="text-white hover:text-green-300 flex items-center py-3 px-6 rounded-lg text-lg font-medium w-full">
            <FaMoneyBillWave className="mr-4 text-2xl" />
            Expense Management
          </Link>
        </li>

        {/* Revenue Management */}
        <li className="transition-all duration-300 hover:scale-105">
          <Link to="/revenue" className="text-white hover:text-green-300 flex items-center py-3 px-6 rounded-lg text-lg font-medium w-full">
            <FaFileInvoice className="mr-4 text-2xl" />
            Revenue Management
          </Link>
        </li>

        {/* Transactions */}
        <li className="transition-all duration-300 hover:scale-105">
          <Link to="/transactions" className="text-white hover:text-green-300 flex items-center py-3 px-6 rounded-lg text-lg font-medium w-full">
            <FaUsers className="mr-4 text-2xl" />
            Transactions
          </Link>
        </li>

        {/* Logout */}
        <li className="transition-all duration-300 hover:scale-105">
        <Link
             to="/"
            className="text-white hover:text-green-300 flex items-center py-3 px-6 rounded-lg text-lg font-medium w-full"
             onClick={() => {
               console.log("Logged out");
            }}
          >
             <FaSignOutAlt className="mr-4 text-2xl" />
           Logout
           </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
