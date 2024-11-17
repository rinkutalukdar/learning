import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-footerBg text-gray-100 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Site Name or Logo */}
        <div className="text-lg font-semibold text-gray-500 mb-4 md:mb-0">
          <img src="/logo.png" alt="Site Logo" className="mx-auto h-10 w-auto" />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <a href="/" className="text-linkColor hover:text-gray-400">Home</a>
          <a href="/about" className="text-linkColor hover:text-gray-400">About</a>
          <a href="/services" className="text-linkColor hover:text-gray-400">Services</a>
          <a href="/contact" className="text-linkColor hover:text-gray-400">Contact</a>
        </nav>

        {/* Copyright Text */}
        <div className="text-sm text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Dapon.tech | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
