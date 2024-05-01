import React from "react";
import {Box, Button, Stack} from "@mui/material";
import {IFilterState} from "frontend/src/hooks/useFilters.tsx";
import FilterWithIcon from "frontend/src/components/map/filter/FilterWithIcon.tsx";
import {FilterType} from "frontend/src/common/types/FilterType.ts";
import Spacer from "frontend/src/components/general/Spacer.tsx";

interface FilterListProps {
  hideFilterMenu: () => void;
  filterInfo: Map<FilterType, IFilterState>;
  handleIconStateChange: (filterType: FilterType, newState: boolean) => void;

  handleSelectAllFilters: () => void;
  handleSelectNoFilters: () => void;
}

export default function FilterList(props: FilterListProps) {
  return (
    <Box
      marginTop={"20px"}
      marginBottom={"20px"}
      marginLeft={"15px"}
      marginRight={"15px"}
    >
      <Stack
        justifyContent={"left"}
      >
        <Button
          variant={"outlined"}
          onClick={() => props.hideFilterMenu()}
        >
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
        <Button
          variant="contained"
          onClick={() => props.handleSelectAllFilters()}
        >
          Select All
        </Button>
        <Spacer spaceLength={"25px"} />
        <Button
          variant="contained"
          onClick={() => props.handleSelectNoFilters()}
        >
          Deselect All
        </Button>
      </Stack>
    </Box>
  );
}
