import React from "react";
import { Link } from "gatsby";

const Navbar: React.FC = () => (
  <header className="bg-gray-800 text-gray-100">
    <div className="container mx-auto px-4 flex justify-between items-center py-4">
      {/* Static Logo */}        
        <Link to="/" className="text-lg font-bold">
          <img src="/logo.png" alt="Site Logo" className="mx-auto h-16 w-auto" />
        </Link>
     
      <Link to="/recipes" className="ml-4">
        Recipes
      </Link>
      <Link to="/redux" className="ml-4">
        Tutorials
      </Link>
    </div>
  </header>
);

export default Navbar;
