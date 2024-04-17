import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import React, {useRef, useState} from "react";
import TextField from "@mui/material/TextField";
import MapNode from "common/src/map/MapNode.ts";

interface NodeInfoProps {
  style: React.CSSProperties;
  title: string;
  node: MapNode;
  textColor: string;
  clearNodeCallback: () => void;
  editNodeCallback: (node: MapNode) => void;
  deleteNodeCallback: (node: MapNode) => void;
}

export default function NodeInfo(props: NodeInfoProps) {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const node = useRef<MapNode>(props.node);

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
        {!editingMode ?
          <>
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
              Node ID: {node.current.nodeID}
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
              X Coord: {node.current.xcoord}
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
              Y Coord: {node.current.ycoord}
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
              Floor: {node.current.floor}
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
              Building: {node.current.building}
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
              Node Type: {node.current.nodeType}
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
              Long Name: {node.current.longName}
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
              Short Name: {node.current.shortName}
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
                onClick={() => setEditingMode(true)}
                sx={{
                  marginLeft: "5px",
                }}
              >
                Edit Node
              </Button>
            </Box>
          </>
        :
          <>
            <TextField
              id={"nodeIDEntry"}
              label={"NodeID"}
              variant={"outlined"}
              defaultValue={node.current.nodeID}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.nodeID = event.target.value}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"xcoordEntry"}
              label={"X Coord"}
              variant={"outlined"}
              defaultValue={node.current.xcoord}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.xcoord = parseInt(event.target.value)}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"ycoordEntry"}
              label={"Y Coord"}
              variant={"outlined"}
              defaultValue={node.current.ycoord}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.ycoord = parseInt(event.target.value)}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"floorEntry"}
              label={"Floor"}
              variant={"outlined"}
              defaultValue={node.current.floor}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.floor = event.target.value}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"buildingEntry"}
              label={"Building"}
              variant={"outlined"}
              defaultValue={node.current.building}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.building = event.target.value}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"nodeTypeEntry"}
              label={"Node Type"}
              variant={"outlined"}
              defaultValue={node.current.nodeType}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.nodeType = event.target.value}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"longNameEntry"}
              label={"Long Name"}
              variant={"outlined"}
              defaultValue={node.current.longName}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.longName = event.target.value}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <TextField
              id={"shortNameEntry"}
              label={"Short Name"}
              variant={"outlined"}
              defaultValue={node.current.shortName}
              size={"small"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => node.current.shortName = event.target.value}
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
                  props.editNodeCallback(node.current);
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
                  props.deleteNodeCallback(node.current);
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
        }
      </Box>
    </Paper>
  );
}
