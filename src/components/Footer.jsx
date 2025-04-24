import React from 'react';

const Footer = () => {
  return (
    <section className="py-10 bg-gray-900 text-white sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex-shrink-0">
              <img
                src="logo.png" 
                alt="Budget Tracker Logo"
                className="h-30" 
              />
          </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12">
          <div>
           
            <ul className="mt-8 space-y-4">
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Works
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-white">Help</p>
            <ul className="mt-8 space-y-4">
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-white">Resources</p>
            <ul className="mt-8 space-y-4">
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  YouTube Playlist
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-white">Extra Links</p>
            <ul className="mt-8 space-y-4">
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" title="" className="text-wite transition-all duration-200 hover:text-white focus:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 md:mt-28 2xl:mt-32">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="sm:flex sm:items-center sm:justify-start sm:space-x-8">

              <ul className="flex flex-wrap items-center justify-start mt-5 gap-x-8 sm:mt-0 gap-y-3">
                <li>
                  <a href="#" title="" className="text-sm text-green-500 transition-all duration-200 hover:text-white focus:text-white">
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a href="#" title="" className="text-sm text-green-500 transition-all duration-200 hover:text-white focus:text-white">
                    Terms & Conditions
                  </a>
                </li>

                <li>
                  <a href="#" title="" className="text-sm text-green-500 transition-all duration-200 hover:text-white focus:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-green-500 lg:mt-0">© Copyright 2021, All Rights Reserved by Budget Tracker</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
