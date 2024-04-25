import Floor from "./FloorTabs.tsx";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Typography } from "@mui/material";
import NodeInfo from "./NodeInfo.tsx";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import EdgeInfo from "./EdgeInfo.tsx";

export default function MapEditorSideBar(props: {
  title: string;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
  autocompleteNodeData: { label: string; node: string }[];
  compareFn: (
    a: { label: string; node: string },
    b: { label: string; node: string },
  ) => number;
  nodeToLabelIdCallback: (node: { label: string; node: string }) => string;
  groupBy: (option: string) => string;
  optionLabel: (option: string) => string;
  renderInput: (params: AutocompleteRenderInputParams) => React.JSX.Element;
  onChange1: (event: React.SyntheticEvent, value: string | null) => void;
  renderInput1: (params: AutocompleteRenderInputParams) => React.JSX.Element;
  open?: boolean;
  handleClick?: () => void;
  checkedBFS?: boolean;
  handleSelectBFS?: () => void;
  checkedAS?: boolean;
  handleSelectAS?: () => void;
  checkedDFS?: boolean;
  handleSelectDFS?: () => void;
  errorMessage?: string;
  onClick?: () => void;
  onClick1?: () => void;
  checked?: boolean;
  onClick2?: () => void;
  icon?: React.JSX.Element;
  callback?: (newFloor: string) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  edgeBetweenNodes: MapEdge | null;
  handleCreateEdge: (startNode1: MapNode, startNode2: MapNode) => void;
  handleDeleteEdge: (edge: MapEdge) => void;
  handleClearNode1: () => void;
  handleClearNode2: () => void;
  handleEditNode: (node: MapNode) => void;
  handleDeleteNode: (node: MapNode) => void;
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          position: "relative",
          marginTop: "0.4%",
          marginLeft: "0.2%",
          width: "18vw",
          height: "90%",
          boxSizing: "border-box",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          elevation: 100,
          zIndex: 1,
          border: "3px solid rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Stack display={"flex"} direction={"column"} sx={{ marginLeft: "4%" }}>

      <Typography
          color={"#003A96"}
          align={"center"}
          fontStyle={"Open Sans"}
          fontSize={30}
          sx={{ marginBottom: "10%", marginRight: "4%", marginTop: "10%" }}
        >
          {props.title}
        </Typography>

        <Stack
          direction={"row"}
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <RadioButtonCheckedIcon
            sx={{ color: "blue" }}
          ></RadioButtonCheckedIcon>

          <Autocomplete
            onChange={props.onChange}
            disablePortal
            id="startNode"
            options={props.autocompleteNodeData
              .sort(props.compareFn)
              .map(props.nodeToLabelIdCallback)}
            groupBy={props.groupBy}
            getOptionLabel={props.optionLabel}
            sx={{ width: "75%" }}
            renderInput={props.renderInput}
          />
        </Stack>

        <Stack>
          <MoreVertIcon fontSize={"medium"}></MoreVertIcon>
        </Stack>

        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <LocationOnIcon
            fontSize={"medium"}
            sx={{ color: "red" }}
          ></LocationOnIcon>

          <Autocomplete
            onChange={props.onChange1}
            disablePortal
            id="startNode"
            options={props.autocompleteNodeData
              .sort(props.compareFn)
              .map(props.nodeToLabelIdCallback)}
            groupBy={props.groupBy}
            getOptionLabel={props.optionLabel}
            sx={{ width: "75%" }}
            renderInput={props.renderInput1}
          />
        </Stack>

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

        {!props.selectedNode1 && !props.selectedNode2 ? (
          <></>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {props.selectedNode1 ? (
              <NodeInfo
                style={{
                  opacity: "1",
                  marginTop: "20px",
                }}
                title={"Node 1"}
                node={props.selectedNode1}
                textColor={"#535353"}
                clearNodeCallback={props.handleClearNode1}
                editNodeCallback={props.handleEditNode}
                deleteNodeCallback={props.handleDeleteNode}
              />
            ) : (
              <></>
            )}
            {props.selectedNode2 ? (
              <NodeInfo
                style={{
                  opacity: "1",
                  marginTop: "20px",
                }}
                title={"Node 2"}
                node={props.selectedNode2}
                textColor={"#535353"}
                clearNodeCallback={props.handleClearNode2}
                editNodeCallback={props.handleEditNode}
                deleteNodeCallback={props.handleDeleteNode}
              />
            ) : (
              <></>
            )}
            {props.selectedNode1 && props.selectedNode2 ? (
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <EdgeInfo
                  style={{
                    opacity: "1",
                    marginTop: "20px",
                    width: "100%",
                    overflow: "clip",
                  }}
                  edge={props.edgeBetweenNodes}
                  selectedNode1={props.selectedNode1}
                  selectedNode2={props.selectedNode2}
                  textColor={"#535353"}
                  createEdgeCallback={props.handleCreateEdge}
                  deleteEdgeCallback={props.handleDeleteEdge}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        )}

        <Stack
          direction={"column"}
          spacing={2}
          sx={{ marginLeft: "10%", marginTop: "20%" }}
        >
          {props.onClick1 && (
            <Button
              variant={"contained"}
              sx={{ width: "80%" }}
              onClick={props.onClick1}
            >
              {props.checked ? "Add Filters" : "Add Filters"}
            </Button>
          )}
          {props.onClick2 && (
            <Button
              variant={"contained"}
              sx={{ width: "80%", backgroundColor: "#D9D9D9" }}
              onClick={props.onClick2}
            >
              Clear Filters
            </Button>
          )}
          {props.checked && (
            <Slide
              in={props.checked}
              direction="up"
              style={{
                zIndex: 1,
                backgroundColor: "#F5F7FA",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                minWidth: "100%",
                height: "100%",
                marginTop: 0,
              }}
            >
              <div>{props.icon || <div />}</div>
            </Slide>
          )}
          {props.callback && <Floor callback={props.callback} />}
        </Stack>
      </Stack>
    </Drawer>
  );
}
