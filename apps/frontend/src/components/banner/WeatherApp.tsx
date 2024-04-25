import React from 'react';
import { Stack } from "@mui/material";
import Weather from "./Weather.tsx";


const WeatherApp = () => {

  return (
    <>
      <Stack direction={"column"} sx={{display: "flex", alignItems: "center", justifyContent: "center" }} spacing={0.1}>
            <Weather/>
        </Stack>
    </>
  );
};

export default WeatherApp;
