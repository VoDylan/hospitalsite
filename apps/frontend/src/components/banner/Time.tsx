import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const CurrentTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // Extract hours and minutes only
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <Typography
        color={"#003A96"}
        fontWeight={"bold"}
        fontSize={"19px"}
        sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }} // Add shadow using sx prop
      >
        {formattedTime}
      </Typography>
    </div>
  );
};

export default CurrentTime;
