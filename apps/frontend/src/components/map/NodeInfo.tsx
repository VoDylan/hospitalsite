import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import {MapNodeType} from "common/src/map/MapNodeType.ts";
import React, {useEffect, useRef, useState} from "react";

interface NodeInfoProps {
  style: React.CSSProperties;
  title: string;
  nodeInfo: MapNodeType;
  textColor: string;
  hidden: boolean;
  clearNodeCallback: () => void;
  editNodeCallback: (event: React.MouseEvent) => void;
}

export default function NodeInfo(props: NodeInfoProps) {
  const style = useRef<React.CSSProperties>(props.style);
  const origOpacity = useRef(style.current.opacity);
  const [newOpacity, setNewOpacity] = useState(origOpacity.current);

  useEffect(() => {
    if(props.hidden) {
      setNewOpacity("0");
    } else {
      setNewOpacity(origOpacity.current);
    }
  }, [props.hidden]);

  return (
    <Paper
      square={false}
      elevation={3}
      style={{
        ...style.current,
        opacity: newOpacity,
      }}
    >
      <Box
        marginTop={"10px"}
        marginBottom={"10px"}
        marginLeft={"20px"}
        marginRight={"20px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
      >
        <Typography
          variant={"h5"}
          fontStyle={"Open Sans"}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginBottom={"10px"}
          color={props.textColor}
        ><b>{props.title}</b></Typography>
        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Node ID: {props.nodeInfo.nodeID}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          X Coord: {props.nodeInfo.xcoord}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Y Coord: {props.nodeInfo.ycoord}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Floor: {props.nodeInfo.floor}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Building: {props.nodeInfo.building}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Node Type: {props.nodeInfo.nodeType}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Long Name: {props.nodeInfo.longName}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Typography
          marginTop={"5px"}
          marginBottom={"5px"}
          color={props.textColor}
        >
          Short Name: {props.nodeInfo.shortName}
        </Typography>

        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5"
          }}
        />

        <Box
          marginTop={"10px"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Button
            variant={"contained"}
            onClick={props.clearNodeCallback}
          >
            Clear Node
          </Button>
          <Button
            variant={"contained"}
            onClick={props.editNodeCallback}
          >
            Edit Node
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
