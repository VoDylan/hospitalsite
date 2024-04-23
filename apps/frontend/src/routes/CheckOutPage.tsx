import React from 'react';
import { TextField, Button, CardContent, Typography, Box } from '@mui/material';
import {flowerCart} from "../components/cart/UpdateCart.tsx";
import { FlowerDeliveryFormSubmission } from '../common/formSubmission/FlowerDeliveryFormSubmission.ts';

const flowerPrices = {
  RRose: 5.99,
  WRose: 4.99,
  RCarn: 3.99,
  Tulip: 2.99
};




function CheckOutPage(){

  const parseAmount = (amountStr: string): number => {
    const parsed = parseInt(amountStr, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Calculate the total price for flowers
  const totalFlowerPrice = flowerCart.reduce((acc, flower) => {
    acc += parseAmount(flower.RRose as string) * flowerPrices['RRose'] +
      parseAmount(flower.WRose as string) * flowerPrices['WRose'] +
      parseAmount(flower.RCarn as string) * flowerPrices['RCarn'] +
      parseAmount(flower.Tulip as string) * flowerPrices['Tulip'];
    return acc;
  }, 0);





  return (
    <Box sx={{ pt: '150px' }} display="flex" justifyContent="center" p={4}>
      {/* Payment Details */}
      <Box width="50%" paddingRight={2}>
        <Typography variant="h5" gutterBottom>Payment Details</Typography>
        <form>
          <TextField fullWidth margin="normal" label="Name on card" variant="outlined" />
          <TextField fullWidth margin="normal" label="Card number" variant="outlined" />
          <Box display="flex" justifyContent="space-between">
            <TextField fullWidth margin="normal" label="Expiration" variant="outlined" style={{ marginRight: '10px', width: '30%' }} />
            <TextField fullWidth margin="normal" label="CVC" variant="outlined" style={{ width: '30%' }} />
          </Box>
          <Button variant="contained" color="primary" fullWidth>Complete order</Button>
          <Button color="secondary">Cancel order</Button>
        </form>
      </Box>

      {/* Order Summary */}
      <Box width="50%" paddingLeft={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Order Summary</Typography>
          {flowerCart.map((flower, index) => (
            <React.Fragment key={index}>
              {Object.keys(flowerPrices).map((flowerType) => {
                const flowerKey = flowerType as keyof FlowerDeliveryFormSubmission;
                const amountStr = flower[flowerKey] as string;
                const amount = parseAmount(amountStr);
                return amount > 0 && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" key={flowerType}>
                    <Typography variant="subtitle1">{flowerType}</Typography>
                    <Typography variant="body1">{amount}</Typography>
                    <Typography variant="body1">${(amount * flowerPrices[flowerType as keyof typeof flowerPrices]).toFixed(2)}</Typography>
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${totalFlowerPrice.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
);

}

export default CheckOutPage;
