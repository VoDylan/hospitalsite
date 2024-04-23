import { Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Filter from "./Filter.tsx";
import React from "react"; // assuming Filter component is located in 'Filter.js' file

interface FilterWithIconProps {
  iconColor: string;
  filterName: string;
  filterType: number;
  shape: string;
  iconState: string;
  handleIconState: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const FilterWithIcon: React.FC<FilterWithIconProps> = ({
  iconColor,
  filterName,
  filterType,
  shape,
  iconState,
  handleIconState,
}) => (
  <Stack
    direction="row"
    spacing={8}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Filter
      iconColor={iconColor}
      filterName={filterName}
      filterType={filterType}
      shape={shape}
    />
    {iconState === "plus" ? (
      <AddBoxIcon
        onClick={handleIconState}
        fontSize="medium"
        sx={{ color: "rgba(0, 0, 0, 0.2)" }}
      />
    ) : (
      <CheckBoxIcon
        onClick={handleIconState}
        fontSize="medium"
        sx={{ color: "rgba(0, 0, 255, 0.5)" }}
      />
    )}
  </Stack>
);

export default FilterWithIcon;
