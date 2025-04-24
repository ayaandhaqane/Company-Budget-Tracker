import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <section>
      <Header />

      {/* About Section */}
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
            {/* Left Column: About Text */}
            <div>
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                About Us
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Welcome to Budget Tracker! We are dedicated to helping businesses streamline their financial management.
                Our goal is to provide tools that enable businesses of all sizes to keep track of their budgets,
                revenue, and expenses with ease. By offering real-time analytics and simple-to-use features, we empower
                companies to make smarter financial decisions and optimize their resources.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Founded with the vision to simplify finance tracking, Budget Tracker serves businesses from startups to
                large enterprises. Our platform integrates seamlessly with your workflow and gives you valuable insights
                into your financial health, helping you stay ahead in a competitive market. Our easy-to-understand
                dashboards, automatic reports, and actionable data are designed to help you succeed.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative pl-20 pr-6 sm:pl-6 md:px-0">
              <div className="relative w-full max-w-4xl mt-4 mb-10 ml-auto">
                <img className="ml-auto w-full h-full rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 object-cover object-center" src="https://i.pinimg.com/736x/43/ff/fc/43fffc1ac35b5eb49330f86b89707769.jpg" alt="Person" />
                <img className="absolute -top-4 -left-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg" alt="Wavey Lines" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default About;
