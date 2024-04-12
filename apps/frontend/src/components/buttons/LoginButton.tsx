import React, { useEffect } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";

const LoginButton = () => {
  useEffect(() => {
    const initializeAuth0 = async () => {
      const auth0 = await createAuth0Client({
        domain: "dev-1bg6tdr43pzdkebi.us.auth0.com",
        clientId: "0GjFZHbJMAaFS5GabTqBigkvkkMxneR9",
      });

      const loginButton = document.getElementById("login");
      if (loginButton) {
        loginButton.addEventListener("click", async () => {
          await auth0.loginWithRedirect({
            authorizationParams: {
              redirect_uri: "http://localhost:3000/",
            },
          });
        });
      }
    };

    initializeAuth0();

    return () => {
      // Cleanup event listener if component unmounts
      const loginButton = document.getElementById("login");
      if (loginButton) {
        loginButton.removeEventListener("click", () => {});
      }
    };
  }, []);

  return <button id="login">Click to Login</button>;
};

export default LoginButton;
