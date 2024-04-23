import { Stack, Typography } from "@mui/material";
import React from "react";

// Import your PNG images for filters
import elevatorImage from "../../images/realMapIcons/elevator.svg";
import deptImage from "../../images/realMapIcons/dept.svg";
import labsImage from "../../images/realMapIcons/labs.svg";
import stairsImage from "../../images/realMapIcons/stairs.svg";
import bathroomImage from "../../images/realMapIcons/bathrom.svg";
import serviceImage from "../../images/realMapIcons/service.svg";
import retailImage from "../../images/realMapIcons/retail.png";
import infoImage from "../../images/realMapIcons/info.svg";
import confImage from "../../images/realMapIcons/conf.png";
import exitImage from "../../images/realMapIcons/exit.png";
import floorImage from "../../images/realMapIcons/floors.png";

interface FilterProps {
  iconColor: string;
  filterName: string;
  filterType: number;
  shape?: string; // Make shape prop optional
}

function Filter(props: FilterProps) {
  // Define icon size
  const iconSize = 25;

  // Define default icon component
  let iconSrc = elevatorImage;

  // Assign icon component based on shape prop if provided
  if (props.shape) {
    switch (props.shape) {
      case "elevators":
        iconSrc = elevatorImage;
        break;
      case "conf":
        iconSrc = confImage;
        break;
      case "dept":
        iconSrc = deptImage;
        break;
      case "labs":
        iconSrc = labsImage;
        break;
      case "stairs":
        iconSrc = stairsImage;
        break;
      case "bathroom":
        iconSrc = bathroomImage;
        break;
      case "floor":
        iconSrc = floorImage;
        break;
      case "service":
        iconSrc = serviceImage;
        break;
      case "retail":
        iconSrc = retailImage;
        break;
      case "info":
        iconSrc = infoImage;
        break;
      case "exit":
        iconSrc = exitImage;
        break;
      default:
        break;
    }
  }

  return (
    <Stack
      direction={"row"}
      spacing={props.shape === "exit" ? 0.7 : props.shape === "floor" ? 1.8 : 1.5}
    alignItems="center" // Align items to the center
      sx={{ display: "flex", justifyContent: "flex-start" }} // Align stack items to the left
    >
      <img
        src={iconSrc}
        alt={props.filterName}
        style={{
          width:
            props.shape === "exit"
            ? iconSize * 1.5
            : props.shape === "floor"
              ? 20 // Adjust width for floor icon
              : iconSize, // Increase width for exit icon
          height: props.shape === "floor"
            ? 20 // Adjust width for floor icon
            : iconSize,
          color: props.iconColor,
          marginLeft: props.shape === "exit" ? -5 : props.shape === "floor"
            ? 4 // Adjust width for floor icon
            : 1,
        }}
      />
      <Typography
        color={"#7B8794"}
        align={"center"}
        fontStyle={"Open Sans"}
        fontSize={14} // Adjust font size of filter name
      >
        {props.filterName}
      </Typography>
    </Stack>
  );
}

export default Filter;
