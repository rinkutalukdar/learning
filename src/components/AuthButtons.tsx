import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import  Profile from "../components/Profile"

const AuthButtons: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <div className="userMenu">
          <Profile />
        </div>
      ) : (
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600" onClick={() => loginWithRedirect()}>Login</button>
      )}
    </>
  );
};

export default AuthButtons;
