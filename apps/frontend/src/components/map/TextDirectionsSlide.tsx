import { Button, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

export default function TextIcon(props: {
  handleButtonClick2: () => void;
  checked2: boolean;
  nodesData: TypeCoordinates[];
}) {
  return (
    <>
      <Stack width={"100%"} height={"100%"}>
        <Paper sx={{ width: "100%", height: "100%" }} elevation={4}>
          <Stack>
            <Button
              startIcon={<ArrowBackIcon/>}
              onClick={props.handleButtonClick2}
              variant="text"
              sx={{
                width: "25%",
                justifySelf: "left",
                marginLeft: "10px",
              }}
            >
              {props.checked2 ? "back" : "back"}

            </Button>
            <p>hello from here?</p>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
