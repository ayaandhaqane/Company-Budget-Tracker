import React from 'react';
import Header from '../components/Header';
import { FaChartBar, FaDollarSign, FaLock, FaUsers, FaClipboardList, FaCloud } from 'react-icons/fa'; 
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-white bg-opacity-40 py-12 sm:py-16 lg:py-28">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left space-y-6">
              <h1 className="mt-4 text-5xl font-extrabold text-black lg:mt-4 sm:text-2xl xl:text-6xl">
                Track & Optimize Your Company Budget
              </h1>
              <p className="text-xl text-gray-700 sm:text-xl">
                Stay in control of your company’s finances with real-time tracking, insightful analytics, and budget optimization tools.
              </p>

              <a
                href="#"
                className="inline-flex items-center px-8 py-4 mt-8 font-semibold text-white bg-gradient-to-r from-green-900 to-green-600 rounded-full hover:bg-green-500 focus:bg-green-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Start Budgeting Now
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>

              <p className="mt-5 text-gray-600">
                Already using our tracker? <a href="#" className="text-green-500 hover:underline">Log in</a>
              </p>
            </div>

            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <img
                className="w-full h-full rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 object-cover object-center"
                src="https://i.pinimg.com/736x/ea/15/94/ea159450eada9eb9cb6d86db0ffc15ab.jpg"
                alt="Budget Tracker Dashboard"
              />
            </div>
          </div>
        </div>
      </section>

     {/* Features Section */}
     <section className="bg-gray-50 py-12 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-black mb-8">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1: Real-time Analytics */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaChartBar className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">Real-time Analytics</h3>
              <p className="text-gray-600 mt-4">
                Get real-time insights into your business's finances with powerful analytics tools.
              </p>
            </div>

            {/* Feature 2: Easy Revenue Tracking */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaDollarSign className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">Easy Revenue Tracking</h3>
              <p className="text-gray-600 mt-4">
                Track all your revenues easily with user-friendly dashboards and filters.
              </p>
            </div>

            {/* Feature 3: Secure Data */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaLock className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">Secure Data</h3>
              <p className="text-gray-600 mt-4">
                Your financial data is stored securely with industry-standard encryption and privacy measures.
              </p>
            </div>

            {/* Feature 4: User Management */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaUsers className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">User Management</h3>
              <p className="text-gray-600 mt-4">
                Easily manage your team members with comprehensive user roles and permissions.
              </p>
            </div>

            {/* Feature 5: Budget Planning */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaClipboardList className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">Budget Planning</h3>
              <p className="text-gray-600 mt-4">
                Plan your budget efficiently by creating customized categories and spending limits.
              </p>
            </div>

            {/* Feature 6: Cloud Integration */}
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <FaCloud className="text-4xl text-green-800 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-black">Cloud Integration</h3>
              <p className="text-gray-600 mt-4">
                Sync your data across devices with seamless cloud integration, ensuring accessibility anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-800 sm:text-4xl sm:leading-tight">Trusted by world class companies</h2>
        </div>

        <div class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
            <div>
                <img class="object-contain w-full h-32 mx-auto" src="google.png" alt="Google" />
            </div>

            <div>
                <img class="object-contain w-full h-32 mx-auto" src="x.png" alt="Twitter" />
            </div>

            <div>
                <img class="object-contain w-full h-32 mx-auto" src="apple.png" alt="Apple" />
            </div>

            <div>
                <img class="object-contain w-full mx-auto h-32" src="insta.png" alt="Instagram" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="fb.png" alt="Facebook" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="ad.png" alt="Adobe" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8m32x-auto" src="nike.png" alt="Nike" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="mc.png" alt="Microsoft" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="spot.png" alt="Spotify" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full mx-auto h-32" src="link.png" alt="LinkedIn" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="yb.png" alt="YouTube" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-32 mx-auto" src="amz.png" alt="Amazon" />
            </div>
        </div>

        <div class="flex items-center justify-center mt-10 space-x-3 md:hidden">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
        </div>

        <p class="mt-10 text-base text-center text-gray-500 md:mt-20">and, 1000+ more companies</p>
    </div>
</section>



      <Footer/>

    </div>
  );
};

export default HomePage;
