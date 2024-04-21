import React from 'react';
import { TextField, Button, CardContent, Typography, Box, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function CheckOutPage(){

return (
  <Box sx={{ pt: '150px' }}
       display="flex"
       justifyContent="center"
       p={4}>
    <Box width="50%"
         paddingRight={2}>
      <Typography
        variant="h5" gutterBottom>
        Payment Details
      </Typography>
      <form>
        <TextField
          fullWidth margin="normal"
          label="Name on card"
          variant="outlined" />
        <TextField
          fullWidth margin="normal"
          label="Card number"
          variant="outlined" />
        <Box
          display="flex"
          justifyContent="space-between">
          <TextField
            fullWidth margin="normal"
            label="Expiration"
            variant="outlined"
            style={{ marginRight: '10px', width: '30%' }} />
          <TextField
            fullWidth margin="normal"
            label="CVC"
            variant="outlined"
            style={{ width: '30%' }} />
        </Box>
        <Button
          variant="contained"
          color="primary" fullWidth>
          Complete order
        </Button>
        <Button color="secondary">
          Cancel order
        </Button>
      </form>
    </Box>

      <CardContent>
        <Typography
          variant="h5" gutterBottom>
          Order Summary
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center">
            <img
              src="./servicePageImages/Cover.jpg"
              alt="Red Roses"
              style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <Typography
              variant="subtitle1">Red Roses</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center">
            <IconButton
              size="small">
              <RemoveCircleOutlineIcon />
            </IconButton>
            <Typography
              variant="body1"
              style={{ margin: '0 10px' }}>1</Typography>
            <IconButton
              size="small">
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Typography
            variant="body1">$5.99</Typography>
        </Box>
        <Box
          sx={{ pt: '15px' }}
          display="flex"
          justifyContent="space-between"
          marginTop={2}>
          <Typography
            variant="body2">Sub total</Typography>
          <Typography
            variant="body2">$5.99</Typography>
        </Box>
        <Box
          sx={{ pt: '15px' }}
          display="flex"
          justifyContent="space-between">
          <Typography
            variant="body2">Tax</Typography>
          <Typography
            variant="body2">$0.46</Typography>
        </Box>
        <Box
          sx={{ pt: '15px' }}
          display="flex"
          justifyContent="space-between">
          <Typography
            variant="body2">Shipping</Typography>
          <Typography
            variant="body2">Free</Typography>
        </Box>
        <Box
          sx={{ pt: '15px' }}
          display="flex"
          justifyContent="space-between">
          <Typography
            variant="h6">Total</Typography>
          <Typography
            variant="h6">$6.45</Typography>
        </Box>
      </CardContent>
  </Box>
);

}

export default CheckOutPage;
