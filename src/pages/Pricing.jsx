import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section>
      <Header />
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Pricing & Plans</h2>
            <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Choose the right plan to manage your trucking career and routes. Whether you're a solo trucker or part of a fleet, we have flexible options to suit your needs.
            </p>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-center space-x-2.5">
              <span className="text-base font-medium text-gray-900"> Monthly </span>

              <button
                type="button"
                className="relative inline-flex flex-shrink-0 h-6 py-0.5 transition-colors duration-200 ease-in-out bg-transparent border-2 border-blue-600 rounded-full cursor-pointer w-12 focus:outline-none"
                role="switch"
                onClick={() => setIsYearly(!isYearly)}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block w-4 h-4 transition duration-200 ease-in-out ${isYearly ? 'translate-x-6 bg-blue-600' : 'bg-gray-400'} rounded-full shadow pointer-events-none`}
                />
              </button>

              <span className="text-base font-medium text-gray-900"> Yearly </span>
            </div>
          </div>

          <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 mt-14 md:gap-9">
            {/* Solo Trucker Plan */}
            <div className="overflow-hidden bg-transparent border-2 border-gray-200 rounded-md">
              <div className="p-6 md:py-8 md:px-9">
                <h3 className="text-xl font-semibold text-black">Solo Trucker</h3>
                <p className="mt-2.5 text-sm text-gray-600">Perfect for independent truckers managing their own routes.</p>

                <div className="flex items-end mt-5">
                  <div className="flex items-start">
                    <span className="text-xl font-medium text-black">$</span>
                    <p className="text-6xl font-medium tracking-tight">{isYearly ? '360' : '39'}</p>
                  </div>
                  <span className="ml-0.5 text-lg text-gray-600"> / {isYearly ? 'year' : 'month'} </span>
                </div>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-gray-900 transition-all duration-200 bg-transparent border-2 rounded-full border-blue-900 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-fuchsia-600"
                >
                  Start Free Consultation
                </a>

                <ul className="flex flex-col mt-8 space-y-4">
                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ 1 Route per Month </span>
                  </li>

                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ Basic Logistics Support </span>
                  </li>

                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ GPS Tracking and Route Planning </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Group Trucker Plan */}
            <div className="overflow-hidden bg-white border-2 border-transparent rounded-md">
              <div className="p-6 md:py-8 md:px-9">
                <h3 className="text-xl font-semibold text-black">Group Trucker</h3>
                <p className="mt-2.5 text-sm text-gray-600">Best for events with multiple routes and extended services.</p>

                <div className="flex items-end mt-5">
                  <div className="flex items-start">
                    <span className="text-xl font-medium text-black">$</span>
                    <p className="text-6xl font-medium tracking-tight">{isYearly ? '720' : '79'}</p>
                  </div>
                  <span className="ml-0.5 text-lg text-gray-600"> / {isYearly ? 'year' : 'month'} </span>
                </div>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-white transition-all duration-200 border-2 border-transparent rounded-full bg-blue-900 hover:opacity-80 focus:opacity-80"
                >
                  Start Free Consultation
                </a>

                <ul className="flex flex-col mt-8 space-y-4">
                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ 5 Routes per Month </span>
                  </li>

                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ Extended Logistics Support </span>
                  </li>

                  <li className="inline-flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">✔️ Advanced GPS and Route Optimization </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Pricing;
