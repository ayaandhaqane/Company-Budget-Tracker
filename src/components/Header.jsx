import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the mobile menu

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

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link to="/" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Home</Link>
            <Link to="/about" className="text-base text-white transition-all duration-200 hover:text-opacity-80">About</Link>
            <Link to="/pricing" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Pricing</Link>
            <Link to="/contact" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Contact</Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on button click
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Sign In and Sign Up */}
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

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              Contact
            </Link>
            <Link
              to="/signin"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
