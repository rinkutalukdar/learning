// src/components/Profile.tsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import UserMenu from "../components/UserMenu";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  // Function to send user info to the backend
  const saveUserToDatabase = async () => {
    if (user) {
      try {
        // Send a POST request to your backend with the user info
        await axios.post(`${process.env.GATSBY_NODE_BACKEND}/users`, {
          name: user.name,
          email: user.email,
          picture: user.picture,
          sub: user.sub, // Auth0 user ID (useful for unique identification)
        });
        console.log("User information saved to the database.");
      } catch (error) {
        console.error("Error saving user information:", error);
      }
    }
  };

  // Use effect to call the function after the user logs in
  useEffect(() => {
    if (isAuthenticated) {
      // saveUserToDatabase();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <UserMenu />
  );
};

export default Profile;
