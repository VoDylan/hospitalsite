import React, { useEffect, useState } from "react";
import MapEdge from "common/src/map/MapEdge.ts";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import MapNode from "common/src/map/MapNode.ts";
import axios from "axios";

interface EdgeInfoProps {
  style: React.CSSProperties;
  selectedNode1: MapNode;
  selectedNode2: MapNode;
  edge: MapEdge | null;
  textColor: string;
  nodeUpdateCallback: () => void;
}

export default function EdgeInfo(props: EdgeInfoProps) {
  const [edge, setEdge] = useState<MapEdge | null>(props.edge);

  useEffect(() => {
    setEdge(props.edge);
  }, [props.edge]);

  const handleCreateEdge = () => {
    console.log("Creating edge");
    try {
      axios
        .put(
          `/api/database/edges/createedge`,
          {
            edgeID: `${props.selectedNode1.nodeID}_${props.selectedNode2.nodeID}`,
            startNodeID: `${props.selectedNode1.nodeID}`,
            endNodeID: `${props.selectedNode2.nodeID}`,
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
            timeoutErrorMessage: "Timed out trying to create edge",
          },
        )
        .then((res) => {
          console.log("Added edge!");
          console.log(res.data);
          props.nodeUpdateCallback();
        });
    } catch (e) {
      console.error("Failed to create edge!");
    }
  };

  const handleDeleteEdge = () => {
    if(!props.edge) return;
    try {
      axios
        .put(
          `/api/database/edges/deleteedge/${props.edge.edgeID}`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          console.log("Deleted edge!");
          console.log(res.data);
          props.nodeUpdateCallback();
        });
    } catch (e) {
      console.error("Failed to delete edge!");
    }
  };

  return (
    <Paper square={false} elevation={3} style={props.style}>
      <Box
        marginTop={"10px"}
        marginBottom={"10px"}
        marginLeft={"20px"}
        marginRight={"20px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"left"}
        overflow={"hidden"}
      >
        {edge ? (
          <>
            <Typography
              variant={"h5"}
              fontStyle={"Open Sans"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"10px"}
              color={props.textColor}
            >
              <b>Edge Info</b>
            </Typography>
            <Typography
              fontStyle={"Open Sans"}
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Edge ID: {edge.edgeID}
            </Typography>

            <Divider
              variant={"middle"}
              orientation={"horizontal"}
              flexItem
              aria-hidden={"true"}
              sx={{
                borderBottom: "2px solid",
                opacity: "0.5",
              }}
            />

            <Typography
              fontStyle={"Open Sans"}
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Start Node ID: {edge.startNodeID}
            </Typography>

            <Divider
              variant={"middle"}
              orientation={"horizontal"}
              flexItem
              aria-hidden={"true"}
              sx={{
                borderBottom: "2px solid",
                opacity: "0.5",
              }}
            />

            <Typography
              fontStyle={"Open Sans"}
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              End Node ID: {edge.endNodeID}
            </Typography>

            <Button
              variant={"contained"}
              onClick={handleDeleteEdge}
              color={"error"}
              sx={{
                marginLeft: "5px",
              }}
            >
              Delete Edge
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={"contained"}
              onClick={handleCreateEdge}
              sx={{
                marginLeft: "5px",
              }}
            >
              Create Edge
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}
