import React from 'react';
import { TextField, Button, CardContent, Typography, Box } from '@mui/material';
import { FlowerDeliveryFormSubmission } from '../common/formSubmission/FlowerDeliveryFormSubmission.ts';
import {useLocation} from "react-router-dom";
import {GiftDeliveryFormSubmission} from "../common/formSubmission/GiftDeliveryFormSubmission.ts";

const flowerPrices = {
  RRose: 5.99,
  WRose: 4.99,
  RCarn: 3.99,
  Tulip: 2.99
};

const giftPrices = {
  balloons: 3.99,
  cards: 1.99,
  bears: 5.99
};

const flowerCart: FlowerDeliveryFormSubmission[] = [];
const giftCart: GiftDeliveryFormSubmission[] = [];

function CheckOutPage(){

  const parseAmount = (amountStr: string): number => {
    return parseInt(amountStr, 10) || 0;
  };

  const location = useLocation();
  if (location.state !== null && location.state.RRose !== undefined) {
    flowerCart.push(location.state);
  }
  else if (location.state !== null && location.state.balloons !== undefined) {
    giftCart.push(location.state);
  }

  // Calculate the total price for flowers
  const totalFlowerPrice = flowerCart.reduce((acc, flower) => {
    acc += parseAmount(flower.RRose) * flowerPrices['RRose'] +
      parseAmount(flower.WRose) * flowerPrices['WRose'] +
      parseAmount(flower.RCarn) * flowerPrices['RCarn'] +
      parseAmount(flower.Tulip) * flowerPrices['Tulip'];
    return acc;
  }, 0);

// Calculate the total price for gift
  const totalGiftPrice = giftCart.reduce((acc, gift) => {
    acc += parseAmount(gift.balloons) * giftPrices['balloons'] +
      parseAmount(gift.cards) * giftPrices['cards'] +
      parseAmount(gift.bears) * giftPrices['bears'] ;
    return acc;
  }, 0);

  const totalPrice = totalFlowerPrice + totalGiftPrice;

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

          {giftCart.map((gift, index) => (
            <React.Fragment key={`gift_${index}`}>
              {Object.keys(giftPrices).map((giftType) => {
                const giftKey = giftType as keyof GiftDeliveryFormSubmission;
                const amountStr = gift[giftKey] as string;
                const amount = parseAmount(amountStr);
                return amount > 0 && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" key={giftType}>
                    <Typography variant="subtitle1">{giftType}</Typography>
                    <Typography variant="body1">{amount}</Typography>
                    <Typography variant="body1">${(amount * giftPrices[giftType as keyof typeof giftPrices]).toFixed(2)}</Typography>
                  </Box>
                );
              })}
            </React.Fragment>
          ))}

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
);

}

export default CheckOutPage;
