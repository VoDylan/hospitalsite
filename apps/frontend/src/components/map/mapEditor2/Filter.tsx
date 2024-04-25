import {Stack, Typography} from "@mui/material";
import React from "react";

// Import your PNG images for filters
import elevatorImage from "../../../images/realMapIcons/elevator.svg";
import deptImage from "../../../images/realMapIcons/dept.svg";
import labsImage from "../../../images/realMapIcons/labs.svg";
import stairsImage from "../../../images/realMapIcons/stairs.svg";
import bathroomImage from "../../../images/realMapIcons/bathrom.svg";
import serviceImage from "../../../images/realMapIcons/service.svg";
import retailImage from "../../../images/realMapIcons/retail.png";
import infoImage from "../../../images/realMapIcons/info.svg";
import confImage from "../../../images/realMapIcons/conf.png";
import exitImage from "../../../images/realMapIcons/exit.png";
import floorImage from "../../../images/realMapIcons/floors.png";
import {NodeTypes} from "common/src/map/MapNodeType.ts";

interface FilterProps {
  iconColor: string;
  filterName: string;
  filterType: NodeTypes | "floor";
}

function Filter(props: FilterProps) {
  // Define icon size
  const iconSize = 27;

  // Define default icon component
  let iconSrc = elevatorImage;

  // Assign icon component based on shape prop if provided
  switch (props.filterType) {
    case NodeTypes.ELEV:
      iconSrc = elevatorImage;
      break;
    case NodeTypes.CONF:
      iconSrc = confImage;
      break;
    case NodeTypes.DEPT:
      iconSrc = deptImage;
      break;
    case NodeTypes.LABS:
      iconSrc = labsImage;
      break;
    case NodeTypes.STAI:
      iconSrc = stairsImage;
      break;
    case NodeTypes.REST:
      iconSrc = bathroomImage;
      break;
    case "floor":
      iconSrc = floorImage;
      break;
    case NodeTypes.SERV:
      iconSrc = serviceImage;
      break;
    case NodeTypes.RETL:
      iconSrc = retailImage;
      break;
    case NodeTypes.INFO:
      iconSrc = infoImage;
      break;
    case NodeTypes.EXIT:
      iconSrc = exitImage;
      break;
    default:
      break;
  }

  return (
    <Stack
      direction={"row"}
      spacing={props.filterType === NodeTypes.EXIT ? 0.7 : props.filterType === "floor" ? 2.2 : 1.5}
    alignItems="center" // Align items to the center
      sx={{ display: "flex", justifyContent: "flex-start" }} // Align stack items to the left
    >
      <img
        src={iconSrc}
        alt={props.filterName}
        style={{
          width:
            props.filterType === NodeTypes.EXIT
            ? iconSize * 1.5
            : props.filterType === "floor"
              ? 20 // Adjust width for floor icon
              : iconSize, // Increase width for exit icon
          height: props.filterType === "floor"
            ? 20 // Adjust width for floor icon
            : iconSize,
          color: props.iconColor,
          marginLeft: props.filterType === NodeTypes.EXIT ? -5 : props.filterType === "floor"
            ? 5 // Adjust width for floor icon
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
