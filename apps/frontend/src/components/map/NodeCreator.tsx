import React, {useState} from "react";
import {Box, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MapNode from "common/src/map/MapNode.ts";
import {Floor} from "common/src/map/Floor.ts";

interface INodeCreatorProps {
  style?: React.CSSProperties;
  mouseXCoord: number;
  mouseYCoord: number;
  canvasXCoord: number;
  canvasYCoord: number;
  floor: Floor;
  handleCloseDialogue: () => void;
}

export default function NodeCreator(props: INodeCreatorProps): React.JSX.Element {
  const [node] = useState<MapNode>(new MapNode());

  return (
    <Paper
      square={false}
      elevation={5}
      style={{
        position: "absolute",
        left: props.mouseXCoord,
        top: props.mouseYCoord,
        width: "400px"
      }}
    >
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
        justifyContent={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"right"}
          alignItems={"center"}
        >
          <Typography
            variant={"h6"}
            fontStyle={"Open Sans"}
            width={"100%"}
            marginLeft={"15px"}
          >
            Node Creator
          </Typography>
          <IconButton
            onClick={props.handleCloseDialogue}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack
          display={"flex"}
          flexDirection={"column"}
          marginRight={"15px"}
          marginLeft={"15px"}
          marginBottom={"15px"}
        >
          <TextField
            id={"nodeIDEntry"}
            label={"NodeID"}
            variant={"outlined"}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.nodeID = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"xcoordEntry"}
            label={"X Coord"}
            variant={"outlined"}
            defaultValue={props.canvasXCoord}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.xcoord = parseInt(event.target.value))
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"ycoordEntry"}
            label={"Y Coord"}
            variant={"outlined"}
            defaultValue={props.canvasYCoord}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.ycoord = parseInt(event.target.value))
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"floorEntry"}
            label={"Floor"}
            variant={"outlined"}
            defaultValue={props.floor}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.floor = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"buildingEntry"}
            label={"Building"}
            variant={"outlined"}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.building = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"nodeTypeEntry"}
            label={"Node Type"}
            variant={"outlined"}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.nodeType = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"longNameEntry"}
            label={"Long Name"}
            variant={"outlined"}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.longName = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"shortNameEntry"}
            label={"Short Name"}
            variant={"outlined"}
            size={"small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              (node.shortName = event.target.value)
            }
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
