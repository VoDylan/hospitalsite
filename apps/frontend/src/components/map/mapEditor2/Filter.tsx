import {Stack, Typography} from "@mui/material";
import React, {useRef} from "react";

// Import your PNG images for filters
import {NodeTypes} from "common/src/map/MapNodeType.ts";
import {IFilterState, IRenderInfo} from "../../../hooks/useFilters.tsx";

interface FilterProps {
  filterInfo: IFilterState;
}

function Filter(props: FilterProps) {
  // Define icon size
  const iconSize = 27;

  const renderInfo = useRef<IRenderInfo>(props.filterInfo.renderInfo!);

  return (
    <Stack
      direction={"row"}
      spacing={renderInfo.current.filterType === NodeTypes.EXIT ? 0.7 : renderInfo.current.filterType === "floor" ? 2.2 : 1.5}
      alignItems="center" // Align items to the center
      sx={{ display: "flex", justifyContent: "flex-start" }} // Align stack items to the left
    >
      <img
        src={renderInfo.current.img}
        alt={renderInfo.current.filterName}
        style={{
          width:
            renderInfo.current.filterType === NodeTypes.EXIT
            ? iconSize * 1.5
            : renderInfo.current.filterType === "floor"
              ? 20 // Adjust width for floor icon
              : iconSize, // Increase width for exit icon
          height: renderInfo.current.filterType === "floor"
            ? 20 // Adjust width for floor icon
            : iconSize,
          color: renderInfo.current.iconColor,
          marginLeft: renderInfo.current.filterType === NodeTypes.EXIT ? -5 : renderInfo.current.filterType === "floor"
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
        {renderInfo.current.filterName}
      </Typography>
    </Stack>
  );
}

export default Filter;
