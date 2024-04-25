import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Stack, Typography } from '@mui/material';
import sunny from "../../images/weather/sun.png";
import cloudy from "../../images/weather/clear-sky.png";
import rain from "../../images/weather/rain.png";
import snow from "../../images/weather/snowy.png";
import storm from "../../images/weather/storm.png";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  }
  weather: {
    main: string;
  }[];
}

const Weather = () => {

  const [data, setData] = useState<WeatherData | null>(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=d8a32aaec2d7b4f151e4a0ee4e578b25`;

  const getWeather = useCallback(() => {
    axios.get(url)
      .then(res => {
        setData(res.data);
        console.log(res.data); // Log the response data here
      })
      .catch(err => {
        console.log(err);
      });
  }, [url]);


  useEffect(() => {
    getWeather();
    const fetchDataInterval = setInterval(getWeather, 60000);
    return () => clearInterval(fetchDataInterval); // Cleanup function to clear interval on component unmount
  }, [getWeather]);


  return (
    <Stack direction="row" spacing={0.5}>
      {data && (
        <>
          {data.weather[0].main === "Clouds" && (
            <img
              src={cloudy}
              alt="cloudy"
              style={{
                width: "31px",
                height: "31px"
              }}
            />
          )}
          {data.weather[0].main === "Rain" && (
            <img
              src={rain}
              alt="rain"
              style={{
                width: "31px",
                height: "31px"
              }}
            />
          )}
          {data.weather[0].main === "Snow" && (
            <img
              src={snow}
              alt="snow"
              style={{
                width: "31px",
                height: "31px"
              }}
            />
          )}
          {data.weather[0].main === "Thunderstorm" && (
            <img
              src={storm}
              alt="storm"
              style={{
                width: "31px",
                height: "31px"
              }}
            />
          )}
          {data.weather[0].main === "Clear" && (
            <img
              src={sunny}
              alt="sunny"
              style={{
                width: "31px",
                height: "31px"
              }}
            />
          )}
            </>
      )}

      <div className="Temp">
        {data && (
          <Typography
            fontWeight="bold"
            fontSize="19px"
            color="#003A96"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}
          >
            {data.main.temp.toFixed()}°F
          </Typography>
        )}
      </div>
    </Stack>
  );
};

export default Weather;
