// src/components/UserMenu.tsx
import React, { useState } from "react";
import { Link } from 'gatsby';
import { useAuth0 } from "@auth0/auth0-react";

const UserMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // If the user is not authenticated, don't show the menu
  if (!isAuthenticated) {
    return null;
  }

  console.log(user);

  return (
    <div className="relative">
      {/* User Avatar/Button to Open Menu */}
      <button onClick={toggleMenu} className="mt-1 focus:outline-none">
        <img
          src={user?.picture}
          alt={user?.name}
          className="w-8 h-8 rounded-full"
        />
      </button>

      {/* Expand/Collapse Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 p-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-4">
            <Link to="/profile" className="text-linkColor hover:text-gray-400">
              Profile
            </Link>
            <button
              className="block w-full text-left py-2 text-sm text-red-500 text-linkColor hover:text-gray-400"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
