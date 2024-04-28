import { useState } from "react";
import {Box, Button, Grid, Stack, Tab, Tabs, Typography} from "@mui/material";
import Textbox from "../components/textbox/Textbox.tsx";
import React from "react";

export default function HealthCalculator() {

  //calculate calories burned
  const [duration, setDuration] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [burned, setBurned] = useState<string>('');

  const calculateBurned = (): void => {
    if (duration && weight && activity) {
      const burnedCalories: string = (parseFloat(duration) * parseFloat(weight) * parseFloat(activity) / (200)).toFixed(2);
      setBurned(burnedCalories);
    }
  };


  //calculate BMI
    const [heightValue, setHeightValue] = useState<string>('');
    const [weightValue, setWeightValue] = useState<string>('');
    const [bmiValue, setBmiValue] = useState<string>('');
    const [bmiMessage, setBmiMessage] = useState<string>('');

    const calculateBmi = (): void => {
      if (heightValue && weightValue) {
        const heightInMeters: number = parseFloat(heightValue) / 100;
        const bmi: string = (parseFloat(weightValue) / (heightInMeters * heightInMeters)).toFixed(2);
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

  //tabs
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleIndexChange = (e, tabIndex: React.SetStateAction<number>) => {
    //console.log(tabIndex);
    setCurrentIndex(tabIndex);
  };

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
        <React.Fragment>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#186BD9",
            //backgroundColor: "white",
          }}
          borderRadius={5}
        >
          <Typography color={"white"} align={"center"} fontSize={40}>
            Health & Wellness Calculator(s)
          </Typography>
        </Grid>
          <Grid container xs={12}>
          <Grid
            item
            xs={6}
            display={"flex"}
            flex="1"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
          <Tabs
            value={currentIndex}
            onChange={handleIndexChange}
            orientation={"vertical"}
          >
            <Tab label='BMI Calculator' />
            <Tab label='Calories Burned Calculator' />
          </Tabs>
        </Grid>
          {currentIndex === 0 && (
        <Box
          display={"flex"}
          flex="1"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
        <Grid
          item
          xs={6}
          mt={"5vh"}
        >
          <Typography color={"black"} align={"center"} fontSize={18}>
            Enter Your Height (cm):
          </Typography>
          <Textbox
            type={"text"}
            label="Height (cm):"
            value={heightValue}
            onChange={(e) => setHeightValue(e.target.value)}
          />
        </Grid>
        <Grid>
          <Typography color={"black"} align={"center"} fontSize={18}>
            Enter Your Weight (kg):
          </Typography>
          <Textbox
            type={"text"}
            label="Weight (kg):"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
          />
        </Grid>
        <Grid>
          <Button onClick={calculateBmi}>
            Click to Calculate BMI
          </Button>
        </Grid>
        {bmiValue && bmiMessage && (
          <Grid
            item
            xs={12}
            mt={"2vh"}
            sx={{
              backgroundColor: "#186BD9",
              //backgroundColor: "white",
            }}
            borderRadius={3}
          >
            <Typography color={"white"} align={"center"} fontSize={18}>
              Calculated BMI: {bmiValue}
            </Typography>
            <Typography color={"white"} align={"center"} fontSize={18}>
              Result: {bmiMessage}
            </Typography>
          </Grid>
        )}
        </Box>
          )}
            {currentIndex === 1 && (
              <Box
                display={"flex"}
                flex="1"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Grid>
                  <Typography color={"black"} align={"center"} fontSize={18}>
                    Enter Your Weight (kg):
                  </Typography>
                  <Textbox
                    type={"text"}
                    label="Weight (kg):"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  //mt={"5vh"}
                >
                  <Typography color={"black"} align={"center"} fontSize={18}>
                    Enter Duration of Activity (mins):
                  </Typography>
                  <Textbox
                    type={"text"}
                    label="Duration (mins):"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                 //mt={"5vh"}
                >
                  <Typography color={"black"} align={"center"} fontSize={18}>
                    Enter MET Intensity of Activity (1-10):
                  </Typography>
                  <Textbox
                    type={"text"}
                    label="Intensity (1-10):"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <Button onClick={calculateBurned}>
                    Click to Calculate Calories Burned
                  </Button>
                </Grid>
                {burned && (
                  <Grid
                    item
                    xs={12}
                    mt={"2vh"}
                    sx={{
                      backgroundColor: "#186BD9",
                      //backgroundColor: "white",
                    }}
                    borderRadius={3}
                  >
                    <Typography color={"white"} align={"center"} fontSize={18}>
                      Result: {burned}
                    </Typography>
                  </Grid>
                )}
              </Box>
            )}
        </Grid>
      </React.Fragment>
        </Stack>
    );
}
