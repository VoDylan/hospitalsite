import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect, user } = useAuth0();
  const {logout} = useAuth0();

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


//const token = await getAccessTokenSilently();

//await axios.delete("/api/computer-requests/" + key, config: {
//  headers: {
//    Authorization: `Bearer ${token}`,
//  },
//});
