import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

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
      sx={{ width: 220 }}
      onClick={user ? handleLogout : handleLogin}
    >
      {user ? 'Logout' : 'Login'}
    </Button>
  );
};

export default LoginButton;






/*await axios.delete("/api/computer-requests/" + key, config: {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});*/
