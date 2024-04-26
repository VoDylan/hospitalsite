import React from "react";
import {Box, Button, Stack} from "@mui/material";
import {IFilterState} from "../../../hooks/useFilters.tsx";
import FilterWithIcon from "./FilterWithIcon.tsx";
import {FilterType} from "../../../common/types/FilterType.ts";

interface FilterListProps {
  hideFilterMenu: () => void;
  filterInfo: Map<FilterType, IFilterState>;
  handleIconStateChange: (filterType: FilterType, newState: boolean) => void;
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
                  filterInfo={filterInfo}
                  handleIconState={props.handleIconStateChange}
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
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
