import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white bg-opacity-30">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
        <div className="flex-shrink-0">
            {/* Logo Image */}
            <img
              src="logo.png" 
              alt="Budget Tracker Logo"
              className="h-30" 
            />
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link to="/" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Home</Link>
            <Link to="/about" className="text-base text-white transition-all duration-200 hover:text-opacity-80">About</Link>
            <Link to="/pricing" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Pricing</Link>
            <Link to="/contact" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Contact</Link>
          </div>

          <div className="hidden lg:flex gap-x-6">
          <Link
            to="/signin"
            className="inline-flex items-center justify-center px-8 py-3 text-base transition-all duration-200 hover:bg-green-500 hover:text-black focus:text-black focus:bg-green-500 font-semibold text-white bg-black rounded-full"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-black inline-flex items-center justify-center px-8 py-3 text-base transition-all duration-200 hover:bg-green-500 hover:text-black focus:text-black focus:bg-green-500 font-semibold rounded-full"
          >
            Sign Up
          </Link>
        </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
