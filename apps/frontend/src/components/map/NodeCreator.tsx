import React, {useEffect, useRef, useState} from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton, InputLabel, MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {INodeCreationInfo} from "../../common/INodeCreationInfo.ts";
import {MapNodeType} from "common/src/map/MapNodeType.ts";
import Draggable, {DraggableBounds} from "react-draggable";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import axios, {isAxiosError} from "axios";

interface INodeCreatorProps {
  style?: React.CSSProperties;
  nodeCreationInfo: INodeCreationInfo;
  floor: string;
  handleCloseDialogue: () => void;
  handleCreateNodeCallback: () => void;
}

const width: number = 400;

export default function NodeCreator(props: INodeCreatorProps): React.JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable>(null);
  const [windowWidth, windowHeight] = useWindowSize();

  const [bounds, setBounds] = useState<DraggableBounds>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const [height, setHeight] = useState<number>(0);

  const [mouseXCoord, setMouseXCoord] = useState<number>(props.nodeCreationInfo.mouseXCoord);
  const [mouseYCoord, setMouseYCoord] = useState<number>(props.nodeCreationInfo.mouseYCoord);

  const [nodeID, setNodeID] = useState<string>("");
  const [xcoord, setXcoord] = useState<number>(props.nodeCreationInfo.canvasXCoord);
  const [ycoord, setYcoord] = useState<number>(props.nodeCreationInfo.canvasYCoord);
  const [floor, setFloor] = useState<string>(props.floor);
  const [building, setBuilding] = useState<string>("");
  const [nodeType, setNodeType] = useState<string>("");
  const [longName, setLongName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");

  useEffect(() => {
    if((props.nodeCreationInfo.mouseXCoord + width) > windowWidth) {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord + (windowWidth - (props.nodeCreationInfo.mouseXCoord + width)));
    } else {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord);
    }

    if(elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();

      if((props.nodeCreationInfo.mouseYCoord + rect.height) > windowHeight) {
        setMouseYCoord(props.nodeCreationInfo.mouseYCoord + (windowHeight - (props.nodeCreationInfo.mouseYCoord + rect.height)));
      } else {
        setMouseYCoord(props.nodeCreationInfo.mouseYCoord);
      }

      setHeight(rect.height);
    } else {
      setMouseYCoord(props.nodeCreationInfo.mouseYCoord);
    }

    setXcoord(props.nodeCreationInfo.canvasXCoord);
    setYcoord(props.nodeCreationInfo.canvasYCoord);
    setFloor(props.floor);
  }, [props.floor, props.nodeCreationInfo.canvasXCoord, props.nodeCreationInfo.canvasYCoord, props.nodeCreationInfo.mouseXCoord, props.nodeCreationInfo.mouseYCoord, windowHeight, windowWidth]);

  /**
   * Reset draggable state when a new location is passed in from a double click
   */
  useEffect(() => {
    const getBounds = (): DraggableBounds => {
      const newBounds: DraggableBounds = {
        left: -1000,
        top: 1000,
        right: 1000,
        bottom: 1000
      };

      newBounds.top = -mouseYCoord + 120;
      newBounds.bottom = windowHeight - mouseYCoord - height;
      newBounds.left = -mouseXCoord + windowWidth * 0.18;
      newBounds.right = windowWidth - mouseXCoord - width;

      return newBounds;
    };

    if(draggableRef.current) {
      draggableRef.current.setState({x: 0, y: 0});
    }

    setBounds(getBounds());
  }, [height, mouseXCoord, mouseYCoord, windowHeight, windowWidth]);

  const handleSubmitNode = () => {
    const newNode: MapNodeType = {
      nodeID: nodeID,
      xcoord: xcoord,
      ycoord: ycoord,
      floor: floor,
      building: building,
      nodeType: nodeType,
      longName: longName,
      shortName: shortName,
    };
    try {
      axios.post("/api/database/nodes", [newNode], {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: status => {
          return status == 200 || status == 304;
        }
      }).then((res) => {
        if (res.status == 200) {
          console.log("Closing dialogue box");
          props.handleCreateNodeCallback();
        }
        if (res.status == 304) console.log("Node with submitted node ID already exists! Database not modified");
      });
    } catch (e) {
      if(isAxiosError(e)) {
        if(e.status == 304) console.log("Database not modified");
        if(e.status == 400) console.log("Bad node data sent to database");
      } else {
        console.log("An unknown error occurred.");
      }
      props.handleCreateNodeCallback();
    }
  };

  return (
    <Draggable
      ref={draggableRef}
      bounds={bounds}
    >
      <Paper
      square={false}
      elevation={5}
      style={{
        ...props.style,
        position: "absolute",
        left: mouseXCoord,
        top: mouseYCoord,
        width: `${width}px`
      }}
      ref={elementRef}
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
            Create Node
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
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNodeID(event.target.value);
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"xcoordEntry"}
            label={"X Coord"}
            variant={"outlined"}
            value={xcoord}
            size={"small"}
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setXcoord(parseInt(event.target.value));
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <TextField
            id={"ycoordEntry"}
            label={"Y Coord"}
            variant={"outlined"}
            value={ycoord}
            size={"small"}
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setYcoord(parseInt(event.target.value));
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Box
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <FormControl fullWidth required size={"small"}>
              <InputLabel id={"floorEntryLabel"}>Floor</InputLabel>
              <Select
                id={"floorEntry"}
                labelId={"floorEntryLabel"}
                label={"Floor*"}
                value={floor}
                onChange={(event: SelectChangeEvent<string>) => {
                  setFloor(event.target.value as string);
                }}
              >
                <MenuItem value={"L2"}>Floor L2</MenuItem>
                <MenuItem value={"L1"}>Floor L1</MenuItem>
                <MenuItem value={"1"}>Floor 1</MenuItem>
                <MenuItem value={"2"}>Floor 2</MenuItem>
                <MenuItem value={"3"}>Floor 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/*<TextField*/}
          {/*  id={"floorEntry"}*/}
          {/*  label={"Floor"}*/}
          {/*  variant={"outlined"}*/}
          {/*  value={floor}*/}
          {/*  size={"small"}*/}
          {/*  required={true}*/}
          {/*  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
          {/*    setFloor(event.target.value);*/}
          {/*  }}*/}
          {/*  sx={{*/}
          {/*    marginTop: "10px",*/}
          {/*    marginBottom: "10px",*/}
          {/*  }}*/}
          {/*/>*/}
          <TextField
            id={"buildingEntry"}
            label={"Building"}
            variant={"outlined"}
            size={"small"}
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBuilding(event.target.value);
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Box
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <FormControl fullWidth required size={"small"}>
              <InputLabel id={"nodeTypeEntryLabel"}>Node Type</InputLabel>
              <Select
                id={"nodeTypeEntry"}
                labelId={"nodeTypeEntryLabel"}
                label={"Node Type*"}
                value={nodeType}
                onChange={(event: SelectChangeEvent<string>) => {
                  setNodeType(event.target.value as string);
                }}
              >
                <MenuItem value={"ELEV"}>Elevator</MenuItem>
                <MenuItem value={"STAI"}>Stairs</MenuItem>
                <MenuItem value={"SERV"}>Service</MenuItem>
                <MenuItem value={"INFO"}>Information</MenuItem>
                <MenuItem value={"REST"}>Restroom</MenuItem>
                <MenuItem value={"EXIT"}>Exit</MenuItem>
                <MenuItem value={"CONF"}>Conference</MenuItem>
                <MenuItem value={"DEPT"}>Department</MenuItem>
                <MenuItem value={"LABS"}>Laboratory</MenuItem>
                <MenuItem value={"RETL"}>Retail</MenuItem>
                <MenuItem value={"HALL"}>Hallway</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            id={"longNameEntry"}
            label={"Long Name"}
            variant={"outlined"}
            size={"small"}
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLongName(event.target.value);
            }}
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
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setShortName(event.target.value);
            }}
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Button
            variant={"contained"}
            style={{
              marginTop: "15px",
            }}
            disabled={
                (nodeID == "") ||
                (Number.isNaN(xcoord)) ||
                (Number.isNaN(ycoord)) ||
                (floor == "") ||
                (building == "") ||
                (nodeType == "") ||
                (longName == "") ||
                (shortName == "")
            }
            onClick={handleSubmitNode}
          >
            Create Node
          </Button>
        </Stack>
      </Stack>
    </Paper>
    </Draggable>
  );
}
