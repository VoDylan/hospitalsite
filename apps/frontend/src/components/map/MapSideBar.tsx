import {Button, IconButton, Drawer, Slide, Stack, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import Floor from "./FloorTabs.tsx";
import NestedList from "./PathfindingSelect.tsx";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default function MapSideBar(props: {
  activeFloor: string;
  title: string;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
  autocompleteNodeData: { label: string; node: string }[];
  compareFn: (
    a: { label: string; node: string },
    b: { label: string; node: string }
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
  checkedDijkstra?: boolean;
  handleSelectDijkstra?: () => void;
  errorMessage?: string;
  onClick?: () => void;
  onClick1?: () => void;
  checked?: boolean;
  onClick2?: () => void;
  checked2: boolean;
  onClick3: () => void;
  icon?: React.JSX.Element;
  callback?: (newFloor: string) => void;
  text: boolean;
  icon2: React.JSX.Element;
}) {

  const [clearPath, setClearPath] = useState(false);

  useEffect(() => {
    if (props.checked2) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup function to remove class on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [props.checked2]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          position: "relative",
          marginTop: "0.4%",
          marginLeft: "0.2%",
          width: "19.5vw",
          height: "100%",
          boxSizing: "border-box",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          elevation: 100,
          zIndex: 1,
          border: "0px solid rgba(0, 0, 0, 0.05)",
          overflow: "auto", // Hide overflow when slide is up
        },
      }}
    >
      <Toolbar />
      <Stack
        display={"flex"}
        direction={"column"}
        sx={{ marginTop: "-8%" }}
      >
        <Typography
          color={"#003A96"}
          align={"center"}
          fontStyle={"Open Sans"}
          fontSize={30}
          sx={{ marginBottom: "10%", marginRight: "4%" }}
        >
          {props.title}
        </Typography>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center",  marginLeft: "4%",  }}>
          <RadioButtonCheckedIcon sx={{ color: "blue" }} />
          <Autocomplete
            onChange={props.onChange}
            disablePortal
            id="startNode"
            options={props.autocompleteNodeData
              .sort(props.compareFn)
              .map(props.nodeToLabelIdCallback)}
            groupBy={props.groupBy}
            getOptionLabel={props.optionLabel}
            sx={{ width: "80%" }}
            renderInput={props.renderInput}
          />
        </Stack>
        <Stack>
          <MoreVertIcon sx={{ marginLeft: "4%", }} fontSize={"medium"}></MoreVertIcon>
        </Stack>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center",  marginLeft: "4%",  }}>
          <LocationOnIcon fontSize={"medium"} sx={{ color: "red" }} />
          <Autocomplete
            onChange={props.onChange1}
            disablePortal
            id="startNode"
            options={props.autocompleteNodeData
              .sort(props.compareFn)
              .map(props.nodeToLabelIdCallback)}
            groupBy={props.groupBy}
            getOptionLabel={props.optionLabel}
            sx={{ width: "80%" }}
            renderInput={props.renderInput1}
          />
        </Stack>
        {/*Pathfinding selection dropdown*/}
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ alignItems: "center", marginTop: "4%",  marginLeft: "4%" }}
        >
          {props.open !== undefined &&
            props.handleClick !== undefined &&
            props.checkedBFS !== undefined &&
            props.handleSelectBFS !== undefined &&
            props.checkedAS !== undefined &&
            props.handleSelectAS !== undefined &&
            props.checkedDFS !== undefined &&
            props.handleSelectDFS !== undefined &&
            props.checkedDijkstra !== undefined &&
            props.handleSelectDijkstra !== undefined && (
              <NestedList
                open={props.open}
                handleClick={props.handleClick}
                checkedBFS={props.checkedBFS}
                handleSelectBFS={props.handleSelectBFS}
                checkedAS={props.checkedAS}
                handleSelectAS={props.handleSelectAS}
                checkedDFS={props.checkedDFS}
                handleSelectDFS={props.handleSelectDFS}
                checkedDijkstra={props.checkedDijkstra}
                handleSelectDijkstra={props.handleSelectDijkstra}
              />
            )}
        </Stack>
        <Stack direction={"column"} spacing={2} sx={{ marginTop: "4%", display: "flex", alignItems: "center" }}>
          {props.errorMessage && <p style={{ color: "red" }}>{props.errorMessage}</p>}
          {props.onClick && (
            <Stack direction="row" alignItems="center" spacing={0} sx={{ width: "100%", paddingLeft: "14%" }}>
              <Button
                startIcon={<AltRouteIcon />}
                variant={"contained"}
                sx={{ width: "84%", display: "flex", justifyContent: "center"}}
                onClick={props.onClick}
              >
                Find Path
              </Button>
              {props.text && (
                <IconButton >
                  <RotateLeftIcon />
                </IconButton>
              )}
            </Stack>
          )}
          {props.text && (
            <Button
              variant={"text"}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "25%",
              }}
              onClick={props.onClick3}
            >
              Text Directions
            </Button>
          )}
        </Stack>

        {/*Text direction box*/}
        {props.checked2 && (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <div>{props.icon2 || <div/>}</div>
          </Box>
        )}

        <Box
          sx={{
            width: "90%",
            height: "0.2vh",
            backgroundColor: "#808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: props.text ? "10%" : "20%", // Conditionally set marginTop
            marginLeft: "4%",
          }}
        ></Box>
        <Stack direction={"column"} spacing={2} sx={{ marginLeft: "14%", marginTop: "20%" }}>
          {props.onClick1 && (
            <Button
              variant={"contained"}
              sx={{ width: "84%" }}
              onClick={props.onClick1}
            >
              {props.checked ? "Add Filters" : "Add Filters"}
            </Button>
          )}
          {props.onClick2 && (
            <Button
              variant={"contained"}
              sx={{ width: "84%", backgroundColor: "#D9D9D9" }}
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
                backgroundColor: "white",
                position: "absolute",
                top: "-1%",
                left: "1%",
                width: "98%",
                minWidth: "98%",
                height: "95%",
              }}
            >
              <div>{props.icon || <div />}</div>
            </Slide>
          )}
          {props.callback && <Floor callback={props.callback} activeFloor={props.activeFloor}/>}
        </Stack>
      </Stack>
    </Drawer>
  );
}
