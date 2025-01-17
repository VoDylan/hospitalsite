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
          }}
          borderRadius={5}
        >
          <Typography color={"white"} align={"center"} fontSize={40} width={"100vh"}>
            Health & Wellness Calculators
          </Typography>
        </Grid>
          <Grid container xs={9} direction={"column"}>
          <Grid
            item
            xs={6}
            position={"fixed"}
            mt={"5vh"}
            mx={"5vh"}
          >
          <Tabs
            value={currentIndex}
            onChange={handleIndexChange}
            orientation={"vertical"}
            sx={{
              //backgroundColor: "grey",
              width: "auto",
              height: "auto",
              boxShadow: "5",
            }}
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
          xs={9}
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
            xs={9}
            mt={"2vh"}
            sx={{
              backgroundColor: "#186BD9",
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
            {currentIndex === 0 && (
            <Grid
              sx={{
                right: 0,
                top: "25%",
                width: "50vh",
                backgroundColor: "#186BD9",
                boxShadow: "5",
                marginRight: "100px",
            }}
              borderRadius={3}
              position={"fixed"}
            >
              <Typography color={"white"} align={"center"} fontSize={20} fontWeight="bold">Please Note:</Typography>
              <Typography color={"white"} align={"center"} fontSize={18}>
                BMI weight calculations are not always accurate because they do not take into account factors such as muscle mass, bone density,
                and overall body composition. This means that individuals with higher muscle mass or denser bones may be classified as overweight or obese based
                on their BMI, even though they may have a healthy level of body fat.
                <br />
                [Source: https://www.medicalnewstoday.com]
              </Typography>
            </Grid>
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
                  <Typography color={"black"} align={"center"} fontSize={18} mt={"1vh"}>
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
                    xs={6}
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
            {currentIndex === 1 && (
              <Grid
                sx={{
                  width: "55vh",
                  right: 0,
                  top: "25%",
                  marginRight: "100px",
                  backgroundColor: "#186BD9",
                  boxShadow: "5",
                }}
                borderRadius={3}
                position={"fixed"}
              >
                <Typography color={"white"} align={"center"} fontSize={20} fontWeight="bold">What is MET?:</Typography>
                <Typography color={"white"} align={"center"} fontSize={18}>
                  "A more precise measure of intensity involves the measurement of a person's oxygen consumption during exercise. Oxygen
                  consumption and the intensity of exercise have a linear relationship; as exercise intensity increases, oxygen consumption increases.
                  Oxygen consumption is measured in MET (metabolic equivalent of a task). There are a few different definitions of MET. The original
                  definition, and the one used by this calculator, is based on oxygen utilization and body mass."
                  <br />
                  [Source: https://www.calculator.net/calories-burned-calculator.html]
                </Typography>
              </Grid>
            )}
        </Grid>
      </React.Fragment>
        </Stack>
    );
}
