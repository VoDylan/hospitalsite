import { Button, Paper, Stack, Box } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import React from "react";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";

export default function TextIcon(props: {
  handleButtonClick2: () => void;
  checked2: boolean;
  nodesData: TypeCoordinates[];
  onClickText: (floor: Floor) => void;
}) {

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#003A96",
          position: "fixed",
          width: "20%",
          zIndex: 9999,
          marginLeft: "-0.4%",
        }}
      >
        <Stack direction={"row"} sx={{ padding: "10px" }}>
          <Button
            startIcon={<RemoveIcon sx={{ fontSize: "large", color: "white" }} />} // Set the font size to large and color to white
            onClick={props.handleButtonClick2}
            variant="text"
            sx={{
              width: "25%",
            }}
          >
          </Button>
        </Stack>
      </Box>
      <Paper
        sx={{
          width: "110%",
          backgroundColor: "#F7F5F2",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          marginTop: "12%",
          // paddingTop: "0.1%",
          paddingBottom: "15%",
          overflowY: "auto", // Apply overflow only to the Paper component
        }}
        elevation={4}
      >
        <Box sx={{ flexGrow: 1, padding: "0px" }}>
          <Stack sx={{ width: "100%" }}>
            {props.nodesData.map((item, index) => (
              index === 0 ?
                <Button
                  key={index}
                  onClick={() => props.onClickText(item.floor as Floor)} // Pass item.floor to onClickText
                  variant="outlined"
                  style={{
                    fontSize: "17px",
                    marginTop: "6%",
                    maxWidth: "96%",
                    width: "100%", // Stretch button to full width
                    borderRadius: "0%",
                    color: "blue",
                    borderColor: "lightGray",
                    textTransform: "none" // Set textTransform to none
                  }}
                >
                  Starting Location: {item.longName}
                </Button>
                : (
                  <Button
                    key={index}
                    onClick={() => props.onClickText(item.floor as Floor)} // Pass item.floor to onClickText
                    variant="outlined"
                    style={{
                      fontSize: "15px",
                      maxWidth: "96%",
                      width: "100%", // Stretch button to full width
                      borderRadius: "0%",
                      color: "black",
                      borderColor: "lightGray",
                      textTransform: "none" // Set textTransform to none
                    }}
                  >
                    {index === props.nodesData.length - 1 ?
                      <p style={{ fontSize: "17px", maxWidth: "360px", color: "green" }}>
                        Arrived at Destination: {item.longName}
                      </p>
                      :
                      `${index}. ${item.direction}`
                    }
                  </Button>
                )
            ))}
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
