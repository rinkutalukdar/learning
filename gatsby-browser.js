// gatsby-browser.js
import "./src/styles/global.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import Auth0ProviderWithHistory from "./src/utils/auth0-provider";

// Combine both Providers
export const wrapRootElement = ({ element }) => (
  <Auth0ProviderWithHistory>
    <Provider store={store}>{element}</Provider>
  </Auth0ProviderWithHistory>
);
