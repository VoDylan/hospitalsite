import React, { useState } from "react";
import { Button, Stack } from "@mui/material";

interface FloorProps {
  callback: (newFloor: string) => void;
}

function Floors({ callback }: FloorProps) {
  // State to track the active button
  const [activeButton, setActiveButton] = useState<string>("L1");

  // Function to handle button click
  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    callback(button);
  };

  return (
    <Stack
      direction="column"
      spacing={0.1}
      sx={{
        position: "fixed",
        right: "1%",
        top: "60%",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: activeButton === "3" ? "#186BD9" : "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: activeButton === "3" ? "white" : "#767674",
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
        onClick={() => handleButtonClick("3")}
      >
        3
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: activeButton === "2" ? "#186BD9" : "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: activeButton === "2" ? "white" : "#767674",
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
        onClick={() => handleButtonClick("2")}
      >
        2
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: activeButton === "1" ? "#186BD9" : "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: activeButton === "1" ? "white" : "#767674",
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
        onClick={() => handleButtonClick("1")}
      >
        1
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: activeButton === "L1" ? "#186BD9" : "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: activeButton === "L1" ? "white" : "#767674",
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
        onClick={() => handleButtonClick("L1")}
      >
        L1
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: activeButton === "L2" ? "#186BD9" : "white",
          width: "60px",
          height: "60px",
          borderRadius: "2px",
          color: activeButton === "L2" ? "white" : "#767674",
          "&:hover": {
            color: "white", // Text color on hover
          },
        }}
        onClick={() => handleButtonClick("L2")}
      >
        L2
      </Button>
    </Stack>
  );
}

export default Floors;
