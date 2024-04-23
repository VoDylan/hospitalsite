import React, {MouseEventHandler, TouchEventHandler, useEffect, useRef, useState} from "react";
import {Box, Button, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {INodeCreationInfo} from "../../common/INodeCreationInfo.ts";
import {MapNodeType} from "common/src/map/MapNodeType.ts";

interface INodeCreatorProps {
  style?: React.CSSProperties;
  nodeCreationInfo: INodeCreationInfo;
  floor: string;
  handleCloseDialogue: () => void;
  className?: string;
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onTouchStart?: TouchEventHandler<HTMLDivElement>
  onTouchEnd?: TouchEventHandler<HTMLDivElement>
}

const width: number = 400;

export default function NodeCreator(props: INodeCreatorProps): React.JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);

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
    if((props.nodeCreationInfo.mouseXCoord + width) > window.innerWidth) {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord + (window.innerWidth - (props.nodeCreationInfo.mouseXCoord + width)));
    } else {
      setMouseXCoord(props.nodeCreationInfo.mouseXCoord);
    }

    if(elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();

      if((props.nodeCreationInfo.mouseYCoord + rect.height) > window.innerHeight) {
        setMouseYCoord(props.nodeCreationInfo.mouseYCoord + (window.innerHeight - (props.nodeCreationInfo.mouseYCoord + rect.height)));
      } else {
        setMouseYCoord(props.nodeCreationInfo.mouseYCoord);
      }
    } else {
      setMouseYCoord(props.nodeCreationInfo.mouseYCoord);
    }

    setXcoord(props.nodeCreationInfo.canvasXCoord);
    setYcoord(props.nodeCreationInfo.canvasYCoord);
    setFloor(props.floor);
  }, [props.floor, props.nodeCreationInfo.canvasXCoord, props.nodeCreationInfo.canvasYCoord, props.nodeCreationInfo.mouseXCoord, props.nodeCreationInfo.mouseYCoord]);

  return (
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
      className={props.className}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
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
          <TextField
            id={"floorEntry"}
            label={"Floor"}
            variant={"outlined"}
            value={floor}
            size={"small"}
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFloor(event.target.value);
            }}
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
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBuilding(event.target.value);
            }}
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
            required={true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNodeType(event.target.value);
            }}
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
            onClick={() => {
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
              console.log(newNode);
            }}
          >
            Create Node
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
