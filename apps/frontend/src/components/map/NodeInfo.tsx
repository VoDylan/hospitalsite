import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import {MapNodeType} from "common/src/map/MapNodeType.ts";
import React from "react";

interface NodeInfoProps {
  style: React.CSSProperties;
  title: string;
  nodeInfo: MapNodeType;
  textColor: string;
  clearNodeCallback: () => void;
  editNodeCallback: (event: React.MouseEvent) => void;
}

export default function NodeInfo(props: NodeInfoProps) {
  return (
    <Paper
      square={false}
      elevation={3}
      style={props.style}
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
            sx={{
              marginRight: "5px",
            }}
          >
            Clear Node
          </Button>
          <Button
            variant={"contained"}
            onClick={props.editNodeCallback}
            sx={{
              marginLeft: "5px",
            }}
          >
            Edit Node
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
