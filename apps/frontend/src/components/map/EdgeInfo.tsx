import React, {useEffect, useState} from "react";
import MapEdge from "common/src/map/MapEdge.ts";
import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import MapNode from "common/src/map/MapNode.ts";

interface EdgeInfoProps {
  style: React.CSSProperties;
  selectedNode1: MapNode;
  selectedNode2: MapNode;
  edge: MapEdge | null;
  textColor: string;
  createEdgeCallback: (selectedNode1: MapNode, selectedNode2: MapNode) => void;
  deleteEdgeCallback: (edge: MapEdge) => void;
}

export default function EdgeInfo(props: EdgeInfoProps) {
  const [edge, setEdge] = useState<MapEdge | null>(props.edge);

  useEffect(() => {
    setEdge(props.edge);
  }, [props.edge]);

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
              onClick={() => props.deleteEdgeCallback(edge)}
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
              onClick={() => props.createEdgeCallback(props.selectedNode1, props.selectedNode2)}
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
