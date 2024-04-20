import React from 'react';
import { Stack, Typography } from "@mui/material";
//
// import sunny from "../../images/weather/sun.png";
import cloudy from "../../images/weather/clear-sky.png";
// import drizzle from "../../images/weather/rainy-day.png";
// import rain from "../../images/weather/rain.png";
// import snow from "../../images/weather/snowy.png";
// import Wind from '@mui/icons-material/Air';
const WeatherApp = () => {
  return (
    <>
      <Stack direction={"column"} sx={{display: "flex", alignItems: "left", justifyContent: "center" }} spacing={0.1}>

        <Stack direction={"row"} spacing={0.5} >
          <img src={cloudy} alt="cloudy"
               style={{
                 width: "29px", height: "29px"
               }}
          />
          <Typography
            fontWeight={"bold"}
            fontSize={"18px"}
            color={"#003A96"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }} // Add shadow using sx prop

          >
            45°F
          </Typography>
        </Stack>
        {/*<Stack direction={"row"} spacing={0.5} sx={{ display: "flex", alignItems: "center", paddingLeft: "4%"}}>*/}
        {/*  <Wind sx={{ fontSize: 20, color: "#003A96" }} />*/}
        {/*  <Typography*/}
        {/*    fontWeight={"bold"}*/}
        {/*    fontSize={"17px"}*/}
        {/*    color={"#003A96"}*/}
        {/*    display={"flex"}*/}
        {/*    alignItems={"center"}*/}
        {/*    justifyContent={"center"}*/}
        {/*    sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', whiteSpace: "nowrap" }}*/}
        {/*  >*/}
        {/*    18 mph*/}
        {/*  </Typography>*/}
        {/*</Stack>*/}
      </Stack>
    </>
  );
};

export default WeatherApp;
