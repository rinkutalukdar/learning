import React, { useState } from 'react';
import { Link } from 'gatsby';
import AuthButtons from "../components/AuthButtons";
import { useAuth0 } from "@auth0/auth0-react";
// import  Profile from "../components/Profile"

const Header = () => {

  const { user, isAuthenticated } = useAuth0(); 
  
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-headerBg text-gray-100">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        
        {/* Logo or Site Name */}
        <div className="text-2xl font-semibold text-white">
          <Link to="/" className="text-lg font-bold">
            <img src="/logo.png" alt="Site Logo" className="mx-auto h-16 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-linkColor hover:text-gray-400 mt-2">Home</Link>
          <Link to="/redux" className="text-linkColor hover:text-gray-400 mt-2">Redux</Link>
          <Link to="/gatsby" className="text-linkColor hover:text-gray-400 mt-2">Gatsby</Link>
          <Link to="/recipes" className="text-linkColor hover:text-gray-400 mt-2">Recipes</Link>
          <Link to="/contact" className="text-linkColor hover:text-gray-400 mt-2">Contact</Link>
          <AuthButtons />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <nav className="md:hidden bg-gray-700">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link to="/" className="block hover:text-gray-400">Home</Link>
            <Link to="/about" className="block hover:text-gray-400">About</Link>
            <Link to="/services" className="block hover:text-gray-400">Services</Link>
            <Link to="/contact" className="block hover:text-gray-400">Contact</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
