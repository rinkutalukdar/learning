import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        
        {/* Site Name or Logo */}
        <div className="text-lg font-semibold text-white mb-4 md:mb-0">
          Learn GatsBy
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/services" className="hover:text-white">Services</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </nav>

        {/* Copyright Text */}
        <div className="text-sm text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Learn GatsBy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
