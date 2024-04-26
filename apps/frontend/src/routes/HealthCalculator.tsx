import { useState } from "react";
import {Box, Grid, Stack, Typography } from "@mui/material";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";

export default function HealthCalculator() {

  function BMICalculator() {
    const [heightValue, setHeightValue] = useState<string>('');
    const [weightValue, setWeightValue] = useState<string>('');
    const [bmiValue, setBmiValue] = useState<string>('');
    const [bmiMessage, setBmiMessage] = useState<string>('');

    const calculateBmi = (): void => {
      if (heightValue && weightValue) {
        const heightInFeet: number = parseFloat(heightValue) / 100;
        const bmi: string = (parseFloat(weightValue) / (heightInFeet * heightInFeet)).toFixed(2);
        setBmiValue(bmi);

        let message: string = '';
        if (parseFloat(bmi) < 18.5) {
          message = 'You may be Underweight';
        } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25) {
          message = 'You may be Normal weight';
        } else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 30) {
          message = 'You may be Overweight';
        } else {
          message = 'You may be Obese';
        }
        setBmiMessage(message);
      } else {
        setBmiValue('');
        setBmiMessage('');
      }
    };
  }

    return (
      <Stack
        direction={"column"}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100wh",
          marginTop: "150px",
          marginBottom: "10vh",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "transparent",
            mt: "25vh",
          }}
        >
          <Typography
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={18}>Arayah Remillard</Typography>
          <ServiceNavTabs />
        </Grid>
        <Box>
        <Typography color={"black"}>
          Health & Wellness Calculator(s)
        </Typography>
        </Box>
      </Stack>
    );
}
