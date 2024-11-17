// src/utils/auth0-provider.tsx
import React, { useEffect } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Auth0ProviderWithHistory: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const domain = process.env.GATSBY_AUTH0_DOMAIN!;
  const clientId = process.env.GATSBY_AUTH0_CLIENT_ID!;
  const redirectUri = window.location.origin;

  // Hook to handle user information on login
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const storeUserInfo = async () => {
      if (isAuthenticated && user) {
        try {
          // Make a POST request to your backend to store user information
          await axios.post(`${process.env.GATSBY_NODE_BACKEND}/user`, {
            name: user.name,
            email: user.email,
            email_verified: user.email_verified,
            family_name: user.family_name,
            given_name: user.given_name,
            nickname: user.nickname,
            picture: user.picture,
            sub: user.sub,
            updated_at: user.updated_at,
          });
        } catch (error) {
          console.error("Error saving user information:", error);
        }
      }
    };

    storeUserInfo();
  }, [isAuthenticated, user]);

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={redirectUri}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
