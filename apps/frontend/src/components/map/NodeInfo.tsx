import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MapNode from "common/src/map/MapNode.ts";
import GraphManager from "../../common/GraphManager.ts";

interface NodeInfoProps {
  style: React.CSSProperties;
  title: string;
  node: MapNode;
  textColor: string;
  clearNodeCallback: () => void;
  nodeUpdateCallback: () => void;
}

export default function NodeInfo(props: NodeInfoProps) {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [node, setNode] = useState<MapNode>(props.node);

  const handleEditNode = (node: MapNode) => {
    GraphManager.getInstance().updateLocalNode(node.nodeInfo);
    props.nodeUpdateCallback();
  };

  const handleDeleteNode = (node: MapNode) => {
    GraphManager.getInstance().deleteLocalNodeByID(node.nodeID);
    props.nodeUpdateCallback();
  };

  useEffect(() => {
    setNode(props.node);
  }, [props.node]);

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
        {!editingMode ? (
          <>
            <Typography
              variant={"h5"}
              fontStyle={"Open Sans"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"10px"}
              color={props.textColor}
            >
              <b>{props.title}</b>
            </Typography>
            <Typography
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Node ID: {node.nodeID}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              X Coord: {node.xcoord}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Y Coord: {node.ycoord}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Floor: {node.floor}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Building: {node.building}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Node Type: {node.nodeType}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Long Name: {node.longName}
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
              marginTop={"5px"}
              marginBottom={"5px"}
              color={props.textColor}
            >
              Short Name: {node.shortName}
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
                  flex: 1,
                }}
              >
                Clear
              </Button>
              <Button
                variant={"contained"}
                onClick={() => setEditingMode(true)}
                sx={{
                  marginLeft: "5px",
                  flex: 1,
                }}
              >
                Edit
              </Button>
            </Box>
          </>
        ) : (
          <>
            <TextField
              id={"nodeIDEntry"}
              label={"NodeID"}
              variant={"outlined"}
              defaultValue={node.nodeID}
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
              defaultValue={node.xcoord}
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
              defaultValue={node.ycoord}
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
              defaultValue={node.floor}
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
              defaultValue={node.building}
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
              defaultValue={node.nodeType}
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
              defaultValue={node.longName}
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
              defaultValue={node.shortName}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                (node.shortName = event.target.value)
              }
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
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
                onClick={() => {
                  handleEditNode(node);
                  setEditingMode(false);
                }}
                sx={{
                  marginRight: "5px",
                }}
              >
                Save Node
              </Button>
              <Button
                variant={"contained"}
                onClick={() => {
                  handleDeleteNode(node);
                  props.clearNodeCallback();
                }}
                sx={{
                  marginLeft: "5px",
                }}
                color={"error"}
              >
                Delete Node
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}
