import React from "react";
import {Box, Button, Stack} from "@mui/material";
import {NodeTypes} from "common/src/map/MapNodeType.ts";
import {IFilterState} from "../../../hooks/useFilters.tsx";
import FilterWithIcon from "./FilterWithIcon.tsx";

interface FilterListProps {
  hideFilterMenu: () => void;
  filterInfo: Map<NodeTypes, IFilterState>;
  handleIconStateChange: (filterType: NodeTypes, newState: boolean) => void;
}

export default function FilterList(props: FilterListProps) {
  return (
    <Box
      marginTop={"20px"}
      marginBottom={"20px"}
      marginLeft={"15px"}
      marginRight={"15px"}
    >
      <Button onClick={() => props.hideFilterMenu()}>
        Back
      </Button>
      <Box
        margin={"15px"}
      >
        <Stack>
          {[...props.filterInfo.values()].map((filterInfo): React.JSX.Element => {
            return (
              (filterInfo.renderInfo) ?
                <FilterWithIcon
                  iconColor={filterInfo.renderInfo.iconColor}
                  filterName={filterInfo.renderInfo.filterName}
                  filterType={filterInfo.renderInfo.filterType}
                  initialIconState={filterInfo.active}
                  handleIconState={props.handleIconStateChange}
                />
                :
                <></>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
