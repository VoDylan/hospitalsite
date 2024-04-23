import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Filter from "../filters/Filter.tsx";

interface LegendProps {
  filterItems: {
    iconColor: string;
    filterName: string;
    filterType: number;
    shape: string;
  }[];
}

function Legend(props: LegendProps) {
  const stack1 = props.filterItems.slice(0, 3);
  const stack2 = props.filterItems.slice(3, 6);
  const stack3 = props.filterItems.slice(6);

  return (
    <>
      {/* Legend */}
        <Box
          sx={{
            width: "180px",
            height: "300px",
            backgroundColor: "#F5F7FA",
            display: "flex",
            alignItems: "top",
            justifyContent: "start",
            position: "fixed",
            right: "0.5%",
            top: "130px",
            marginTop: "15px",
            borderRadius: "1%",
            border: "3px solid rgba(0, 0, 0, 0.05)",
            opacity: "0.9",
          }}
        >
          <Stack direction={"column"} sx={{ marginLeft: "6%" }} spacing={0.2}>
            <Typography color={"#767674"} fontStyle={"Open Sans"} fontSize={18}>
              Map Symbols
            </Typography>
            <Stack direction="column" spacing={0.2}>
              {stack1.map((item, index) => (
                <Filter
                  key={index}
                  iconColor={item.iconColor}
                  filterName={item.filterName}
                  filterType={item.filterType}
                  shape={item.shape}
                />
              ))}
            </Stack>
            <Stack direction="column" spacing={0.2}>
              {stack2.map((item, index) => (
                <Filter
                  key={index}
                  iconColor={item.iconColor}
                  filterName={item.filterName}
                  filterType={item.filterType}
                  shape={item.shape}
                />
              ))}
            </Stack>
            <Stack direction="column" spacing={0.2}>
              {stack3.map((item, index) => (
                <Filter
                  key={index}
                  iconColor={item.iconColor}
                  filterName={item.filterName}
                  filterType={item.filterType}
                  shape={item.shape}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
    </>
  );
}

export default Legend;
