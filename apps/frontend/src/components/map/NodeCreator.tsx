import React, {useEffect, useState} from "react";
import {Box, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MapNode from "common/src/map/MapNode.ts";
import {Floor} from "common/src/map/Floor.ts";
import {INodeCreationInfo} from "../../common/INodeCreationInfo.ts";

interface INodeCreatorProps {
  style?: React.CSSProperties;
  nodeCreationInfo: INodeCreationInfo;
  floor: Floor;
  handleCloseDialogue: () => void;
}

const width: number = 400;

export default function NodeCreator(props: INodeCreatorProps): React.JSX.Element {
  const [node] = useState<MapNode>(new MapNode());
  const [mouseXCoord, setMouseXCoord] = useState<number>(props.nodeCreationInfo.mouseXCoord);
  const [mouseYCoord, setMouseYCoord] = useState<number>(props.nodeCreationInfo.mouseYCoord);
  const [canvasXCoord, setCanvasXCoord] = useState<number>(props.nodeCreationInfo.canvasXCoord);
  const [canvasYCoord, setCanvasYCoord] = useState<number>(props.nodeCreationInfo.canvasYCoord);
  const [floor, setFloor] = useState<Floor>(props.floor);

  useEffect(() => {
    if((props.nodeCreationInfo.mouseXCoord + width) > window.innerWidth) {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord + (window.innerWidth - (props.nodeCreationInfo.mouseXCoord + width)));
    } else {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord);
    }

    setMouseYCoord(props.nodeCreationInfo.mouseYCoord);
    setCanvasXCoord(props.nodeCreationInfo.canvasXCoord);
    setCanvasYCoord(props.nodeCreationInfo.canvasYCoord);
    setFloor(props.floor);
  }, [
    props.floor,
    props.nodeCreationInfo.canvasXCoord,
    props.nodeCreationInfo.canvasYCoord,
    props.nodeCreationInfo.mouseXCoord,
    props.nodeCreationInfo.mouseYCoord
  ]);

  console.log("Reloading node creator");

  return (
    <Paper
      square={false}
      elevation={5}
      style={{
        position: "absolute",
        left: mouseXCoord,
        top: mouseYCoord,
        width: `${width}px`
      }}
    >
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
        justifyContent={"center"}
        margin={"15px"}
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
            Create New Node
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
          margin={"15px"}
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
            value={canvasXCoord}
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
            value={canvasYCoord}
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
            value={floor}
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
