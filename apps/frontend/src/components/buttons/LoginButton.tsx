import React, { useEffect } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import Button from "@mui/material/Button";

const LoginButton = () => {
  useEffect(() => {
    const initializeAuth0 = async () => {
      const auth0 = await createAuth0Client({
        domain: "dev-1bg6tdr43pzdkebi.us.auth0.com",
        clientId: "0GjFZHbJMAaFS5GabTqBigkvkkMxneR9",
      });

      const loginButton = document.getElementById("login");
      const handleClick = async () => {
        await auth0.loginWithRedirect();
      };

      if (loginButton) {
        loginButton.addEventListener("click", handleClick);
      }

      return () => {
        // Cleanup event listener if component unmounts
        if (loginButton) {
          loginButton.removeEventListener("click", handleClick);
        }
      };
    };

    initializeAuth0();
  }, []);

  return (
    <Button id="login" sx={{ width: 220 }} variant="contained">
      Sign In
    </Button>
  );
};

export default LoginButton;

//const token = await getAccessTokenSilently();

//await axios.delete("/api/computer-requests/" + key, config: {
//  headers: {
//    Authorization: `Bearer ${token}`,
//  },
//});
