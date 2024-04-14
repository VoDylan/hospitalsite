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
import Toolbar from "@mui/material/Toolbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { Typography } from "@mui/material";
import NestedList from "./PathfindingSelect.tsx";

export default function MapSideBar(props: {
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
  errorMessage?: string;
  onClick?: () => void;
  onClick1?: () => void;
  checked?: boolean;
  onClick2?: () => void;
  icon?: React.JSX.Element;
  callback?: (newFloor: string) => void;
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: "18%",
          height: "100%",
          minWidth: "18%",
          boxSizing: "border-box",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          elevation: 100,
          zIndex: 1,
          border: "3px solid rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Toolbar />

      <Stack display={"flex"} direction={"column"} sx={{ marginLeft: "4%" }}>
        <Typography
          color={"#003A96"}
          align={"center"}
          fontStyle={"Open Sans"}
          fontSize={30}
          sx={{ marginBottom: "10%", marginRight: "4%", marginTop: "30%" }}
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
          sx={{ display: "flex", alignItems: "center" }}
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

        {/*Pathfinding selection dropdown*/}
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "8%",
            marginLeft: "2%",
          }}
        >
          {props.open !== undefined &&
            props.handleClick !== undefined &&
            props.checkedBFS !== undefined &&
            props.handleSelectBFS !== undefined &&
            props.checkedAS !== undefined &&
            props.handleSelectAS !== undefined && (
              <NestedList
                open={props.open}
                handleClick={props.handleClick}
                checkedBFS={props.checkedBFS}
                handleSelectBFS={props.handleSelectBFS}
                checkedAS={props.checkedAS}
                handleSelectAS={props.handleSelectAS}
              />
            )}
        </Stack>

        <Stack
          direction={"column"}
          spacing={2}
          sx={{ marginLeft: "10%", marginTop: "4%" }}
        >
          {props.errorMessage && (
            <p style={{ color: "red" }}>{props.errorMessage}</p>
          )}
          {props.onClick && (
            <Button
              startIcon={<AltRouteIcon />}
              variant={"contained"}
              sx={{ width: "80%", display: "flex", justifyContent: "center" }}
              onClick={props.onClick}
            >
              Find Path
            </Button>
          )}
        </Stack>

        <Box
          sx={{
            width: "90%",
            height: "0.2vh",
            backgroundColor: "#808080",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20%",
            marginLeft: "2%",
          }}
        ></Box>

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
                top: "12%",
                left: "0.2%",
                width: "100%",
                minWidth: "100%",
                height: "100%",
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
