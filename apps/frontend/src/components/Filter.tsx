import { Stack, Typography } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";

interface FilterProps {
  iconColor: string;
  filterName: string;
  filterType: number;
}

function Filter(props: FilterProps) {
  if (props.filterType === 1) {
    return (
      <>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <SquareIcon sx={{ color: props.iconColor }}></SquareIcon>
          <Typography
            color={"#7B8794"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={20}
          >
            {props.filterName}
          </Typography>
        </Stack>
      </>
    );
  }
  return (
    <Typography color={"#7B8794"} fontStyle={"Open Sans"} fontSize={20}>
      {props.filterName}
    </Typography>
  );
}

export default Filter;
