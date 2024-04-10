import { Stack, Typography } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import CircleIcon from "@mui/icons-material/Circle";
import PentagonIcon from "@mui/icons-material/Pentagon";
import StairsIcon from "@mui/icons-material/Stairs";

interface FilterProps {
  iconColor: string;
  filterName: string;
  filterType: number;
  shape?: string; // Make shape prop optional
}

function Filter(props: FilterProps) {
  // Define icon size
  const iconSize = 28;

  // Define default icon component
  let IconComponent = SquareIcon;

  // Assign icon component based on shape prop if provided
  if (props.shape) {
    switch (props.shape) {
      case "square":
        IconComponent = SquareIcon;
        break;
      case "circle":
        IconComponent = CircleIcon;
        break;
      case "pentagon":
        IconComponent = PentagonIcon;
        break;
      case "stairs":
        IconComponent = StairsIcon;
        break;
      default:
        break;
    }
  }

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <IconComponent
        sx={{ color: props.iconColor, fontSize: iconSize }}
      ></IconComponent>
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
