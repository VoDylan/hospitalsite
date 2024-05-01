import React, {useEffect, useState} from "react";
import { Button, Stack } from "@mui/material";
import {Floor, floorStrToObj} from "common/src/map/Floor.ts";

interface FloorProps {
  setFloor: (newFloor: Floor) => void;
  activeFloor: Floor; // Add the activeFloor prop
}

function Floors(props: FloorProps) {
  // State to track the active button
  const [activeButton, setActiveButton] = useState<string>(props.activeFloor); // Initialize activeButton with activeFloor prop

  useEffect(() => {
    setActiveButton(props.activeFloor);
  }, [props.activeFloor]);
  // Function to handle button click
  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    handleFloorChange(button);
  };

  const handleFloorChange = (newFloor: string) => {
    const newFloorObj = floorStrToObj(newFloor);

    if (!newFloorObj) {
      console.error("New map floor is not a valid floor!");
      return;
    }

    props.setFloor(newFloorObj);
  };

  return (
    <Stack
      direction={"column"}
      spacing={0.3}
      flex={1}
      sx={{
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: "25px",
        zIndex: 2,
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
