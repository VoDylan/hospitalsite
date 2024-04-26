import {IFilterState} from "../../../hooks/useFilters.tsx";
import {Box, Stack, Typography} from "@mui/material";
import Filter from "./Filter.tsx";
import React, {useEffect, useState} from "react";

interface LegendProps {
  filterInfo: IFilterState[];
}

export default function Legend(props: LegendProps) {
  const [filterInfo, setFilterInfo] = useState<IFilterState[]>(props.filterInfo);

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  return (
    <Box
      sx={{
        minHeight: "50px",
        backgroundColor: "#F5F7FA",
        display: "flex",
        alignItems: "top",
        justifyContent: "start",
        opacity: "0.9",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          margin: "10px",
        }}
      >
        <Stack direction={"column"}>
          <Typography
            color={"#767674"}
            fontStyle={"Open Sans"}
            fontSize={18}
            textAlign={"center"}
            marginBottom={"10px"}
          >
            Active Map Symbols
          </Typography>
          {filterInfo.map((item: IFilterState): React.JSX.Element => {
            if(!item.renderInfo || !item.active) return (<></>);
            return (
              <Box
                sx={{
                  marginTop: "1px",
                  marginBottom: "1px",
                }}
              >
                <Filter filterInfo={item}/>
              </Box>
            );
          })}
        </Stack>
      </Box>

    </Box>
  );
}
