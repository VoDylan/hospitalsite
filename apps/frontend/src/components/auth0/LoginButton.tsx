import React, {useEffect} from 'react';
import {Button } from '@mui/material'; //IconButton, Stack
import { useAuth0 } from '@auth0/auth0-react';
//import {AccountCircle} from "@mui/icons-material";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, user, logout, isAuthenticated, getAccessTokenSilently, isLoading   } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          redirect_uri: 'http://localhost:3000/'
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout =  () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      }).then(() => {

      }).catch(error => {
      console.error('Error logging out:', error);
      });
      };

  useEffect( () => {
    const getToken = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        await loginWithRedirect({
          appState: {
            returnTo: location.pathname,
          },
        });
      }
  };
//get token if authenticated
  if (!isLoading && isAuthenticated) {
    getToken().then();
  }
}, [
  getAccessTokenSilently,
  isAuthenticated,
  isLoading,
  loginWithRedirect,
  ]);

  return (
      <Button
        variant="contained"
        sx={{width: 220}}
        onClick={user ? handleLogout : handleLogin}
      >
        {user ? 'Logout' : 'Login'}
      </Button>
  );
};

export default LoginButton;

/*<Stack
  direction="row"
  spacing={2}
  alignItems="center"
  display={"flex"}
  sx={{ flexGrow: 1 }}>
  <Button
    variant="contained"
    sx={{width: 220}}
    onClick={user ? handleLogout : handleLogin}
  >
    {user ? 'Logout' : 'Login'}
  </Button>
  <IconButton
    sx={{ color: "#012D5A" }}
    size="large"
    aria-label="account of current user"
  >
    {user ? (
      <img
        src={user.picture}
        alt="Profile"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    ) : (
      <AccountCircle />
    )}
  </IconButton>
</Stack>*/

