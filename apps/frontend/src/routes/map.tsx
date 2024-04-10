import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Filter from "../components/Filter.tsx";
import Paper from "@mui/material/Paper";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TopBanner2 from "../components/TopBanner2.tsx";
import MapImage from "../images/00_thelowerlevel1.png";
import NestedList from "../components/PathfindingSelect.tsx";
import "./map.css";
import { Coordinates } from "common/src/Coordinates.ts";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import Legend from "../components/Legend.tsx";
import { Typography } from "@mui/material";
import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import NodeFilter from "common/src/filter/filters/Filter.ts";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nodesData, setNodesData] = useState<Coordinates[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dbNodeData, setDBNodesData] = useState<MapNodeType[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);
  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  //Pathfinder
  const [open, setOpen] = React.useState(false);
  const [checkedBFS, setCheckedBFS] = React.useState(true);
  const [checkedAS, setCheckedAS] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("BFS");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  const loadNodeData = async (): Promise<MapNodeType[]> => {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes"))
      .data as MapNodeType[];

    data.forEach((node) => {
      if (!GraphManager.getInstance().getNodeByID(node.nodeID))
        GraphManager.getInstance().nodes.push(new MapNode(node));
    });

    console.log(GraphManager.getInstance().nodes);

    return data;
  };

  const populateAutocompleteData = useCallback((nodes: MapNode[]) => {
    console.log(nodes);
    const filteredNodeAssociations = nodes.map((node) => ({
      label: node.longName, // Assuming `longName` is the label you want to use
      node: node.nodeID,
    }));
    setAutocompleteNodeData(filteredNodeAssociations);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelectBFS = () => {
    if (checkedAS) {
      setCheckedAS(false);
    }
    setCheckedBFS(!checkedBFS);
    setAlgorithm("BFS");
  };

  const handleSelectAS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    }
    setCheckedAS(!checkedAS);
    setAlgorithm("A*");
  };

  // Slide Container
  const [checked, setChecked] = React.useState(false);
  // const [iconState, setIconState] = React.useState<"plus" | "check">("plus"); // State to track icon state

  const handleButtonClick = () => {
    setChecked((prev) => !prev);
  };

  const [elevatorIconState, setElevatorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [stairsIconState, setStairsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [exitsIconState, setExitsIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [servIconState, setServIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [infoIconState, setInfoIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [restroomsIconState, setRestroomsIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [confIconState, setConfIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [deptIconState, setDeptIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [labsIconState, setLabsIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [retlIconState, setRetlIconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [ll1IconState, setLL1IconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [ll2IconState, setLL2IconState] = React.useState<"plus" | "check">(
    "check",
  );
  const [firstFloorIconState, setFirstFloorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [secondFloorIconState, setSecondFloorIconState] = React.useState<
    "plus" | "check"
  >("check");
  const [thirdFloorIconState, setThirdFloorIconState] = React.useState<
    "plus" | "check"
  >("check");

  const items = [
    ...(confIconState === "check"
      ? [
          {
            iconColor: "#1CA7EC",
            filterName: "Conference",
            filterType: 1,
            shape: "pentagon",
          },
        ]
      : []),
    ...(deptIconState === "check"
      ? [
          {
            iconColor: "#72c41c",
            filterName: "Department",
            filterType: 1,
            shape: "pentagon",
          },
        ]
      : []),
    ...(labsIconState === "check"
      ? [
          {
            iconColor: "#e88911",
            filterName: "Labs",
            filterType: 1,
            shape: "pentagon",
          },
        ]
      : []),
    ...(servIconState === "check"
      ? [
          {
            iconColor: "#e88911",
            filterName: "Service",
            filterType: 1,
            shape: "circle",
          },
        ]
      : []),
    ...(infoIconState === "check"
      ? [
          {
            iconColor: "#1CA7EC",
            filterName: "Info",
            filterType: 1,
            shape: "circle",
          },
        ]
      : []),
    ...(restroomsIconState === "check"
      ? [
          {
            iconColor: "#72c41c",
            filterName: "Restrooms",
            filterType: 1,
            shape: "circle",
          },
        ]
      : []),
    ...(elevatorIconState === "check"
      ? [
          {
            iconColor: "#1CA7EC",
            filterName: "Elevators",
            filterType: 1,
            shape: "square",
          },
        ]
      : []),
    ...(stairsIconState === "check"
      ? [
          {
            iconColor: "#72c41c",
            filterName: "Stairs",
            filterType: 1,
            shape: "square",
          },
        ]
      : []),
    ...(exitsIconState === "check"
      ? [
          {
            iconColor: "red",
            filterName: "Exits",
            filterType: 1,
            shape: "square",
          },
        ]
      : []),
    ...(retlIconState === "check"
      ? [
          {
            iconColor: "#e88911",
            filterName: "Retail",
            filterType: 1,
            shape: "square",
          },
        ]
      : []),
  ];
  const handleElevatorIconState = () => {
    setElevatorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    setFiltersApplied(false);
  };
  const handleStairsIconState = () => {
    setStairsIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    setFiltersApplied(false);
  };
  const handleExitsIconState = () => {
    setExitsIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleInfoIconState = () => {
    setInfoIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleServIconState = () => {
    setServIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleRestroomsIconState = () => {
    setRestroomsIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    setFiltersApplied(false);
  };
  const handleConfIconState = () => {
    setConfIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleDeptIconState = () => {
    setDeptIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleLabsIconState = () => {
    setLabsIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleRetlIconState = () => {
    setRetlIconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };

  const handleLL1IconState = () => {
    setLL1IconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };
  const handleLL2IconState = () => {
    setLL2IconState((prevState) => (prevState === "plus" ? "check" : "plus"));
    setFiltersApplied(false);
  };

  // let restrooms: boolean = false;
  const handleFirstFloorIconState = () => {
    setFirstFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    // restrooms = true;tru
    setFiltersApplied(false);
  };
  const handleSecondFloorIconState = () => {
    setSecondFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    setFiltersApplied(false);
  };
  const handleThirdFloorIconState = () => {
    setThirdFloorIconState((prevState) =>
      prevState === "plus" ? "check" : "plus",
    );
    setFiltersApplied(false);
  };

  const handleSelectAll = () => {
    setElevatorIconState("check");
    setStairsIconState("check");
    setExitsIconState("check");
    setInfoIconState("check");
    setServIconState("check");
    setRestroomsIconState("check");
    setConfIconState("check");
    setDeptIconState("check");
    setLabsIconState("check");
    setRetlIconState("check");
    setLL1IconState("check");
    setLL2IconState("check");
    setFirstFloorIconState("check");
    setSecondFloorIconState("check");
    setThirdFloorIconState("check");
    setFiltersApplied(false);
  };

  const handleClearAll = () => {
    setElevatorIconState("plus");
    setStairsIconState("plus");
    setExitsIconState("plus");
    setInfoIconState("plus");
    setServIconState("plus");
    setRestroomsIconState("plus");
    setConfIconState("plus");
    setDeptIconState("plus");
    setLabsIconState("plus");
    setRetlIconState("plus");
    setLL1IconState("plus");
    setLL2IconState("plus");
    setFirstFloorIconState("plus");
    setSecondFloorIconState("plus");
    setThirdFloorIconState("plus");
    setFiltersApplied(false);
  };

  const registerFilters = useCallback(() => {
    FilterManager.getInstance().registerFilter(
      FilterName.TYPE,
      () => new TypeFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.FLOOR,
      () => new FloorFilter(),
    );
    FilterManager.getInstance().registerFilter(
      FilterName.BUILDING,
      () => new BuildingFilter(),
    );
  }, []);

  const determineFilters = useCallback(() => {
    const filters: NodeFilter[] = [];
    filters.push(
      FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
        generateFilterValue(true, "HALL"),
      ])!,
    );

    if (ll1IconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(true, "L1"),
        ])!,
      );
    }

    if (ll2IconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(true, "L2"),
        ])!,
      );
    }

    if (firstFloorIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(true, "1"),
        ])!,
      );
    }

    if (secondFloorIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(true, "2"),
        ])!,
      );
    }

    if (thirdFloorIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(true, "3"),
        ])!,
      );
    }

    if (elevatorIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "ELEV"),
        ])!,
      );
    }

    if (stairsIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "STAI"),
        ])!,
      );
    }

    if (servIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "SERV"),
        ])!,
      );
    }

    if (restroomsIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "REST"),
        ])!,
      );
    }

    if (exitsIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "EXIT"),
        ])!,
      );
    }

    if (confIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "CONF"),
        ])!,
      );
    }

    if (deptIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "DEPT"),
        ])!,
      );
    }

    if (labsIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "LABS"),
        ])!,
      );
    }

    if (retlIconState === "plus") {
      filters.push(
        FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
          generateFilterValue(true, "RETL"),
        ])!,
      );
    }

    console.log("Filtering");

    const newFilteredNodes: MapNode[] =
      FilterManager.getInstance().applyFilters(
        filters,
        GraphManager.getInstance().nodes,
      );

    setFilteredNodes(newFilteredNodes); // Update filteredNodes state with the filtered result

    // Update autocomplete data based on the filtered nodes
    populateAutocompleteData(newFilteredNodes);
  }, [
    populateAutocompleteData,
    ll1IconState,
    ll2IconState,
    elevatorIconState,
    stairsIconState,
    servIconState,
    restroomsIconState,
    exitsIconState,
    confIconState,
    deptIconState,
    labsIconState,
    retlIconState,
    firstFloorIconState,
    secondFloorIconState,
    thirdFloorIconState,
  ]);

  const icon = (
    <Paper sx={{ width: "100%", height: "100%" }} elevation={4}>
      <Stack direction="column" sx={{ position: "absolute", top: 3, left: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleButtonClick}
          variant="text"
        >
          {checked ? "back" : "back"}
        </Button>
      </Stack>

      <Stack
        spacing={"10%"}
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          position: "relative",
          marginTop: "18%",
          marginLeft: "10%",
        }}
      >
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={6}
          >
            <Filter
              iconColor="#1CA7EC"
              filterName="Conference"
              filterType={1}
              shape={"pentagon"}
            />
            {confIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleConfIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleConfIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>

          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={5.7}
          >
            <Filter
              iconColor="#72c41c"
              filterName="Department"
              filterType={1}
              shape={"pentagon"}
            />
            {deptIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleDeptIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleDeptIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>

          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={11.2}
          >
            <Filter
              iconColor="#e88911"
              filterName="Labs"
              filterType={1}
              shape={"pentagon"}
            />
            {labsIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleLabsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleLabsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={9.3}
          >
            <Filter
              iconColor="#e88911"
              filterName="Service"
              filterType={1}
              shape={"circle"}
            />
            {servIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleServIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleServIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={12}
          >
            <Filter
              iconColor="#1CA7EC"
              filterName="Info"
              filterType={1}
              shape={"circle"}
            />
            {infoIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleInfoIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleInfoIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={6.4}
          >
            <Filter
              iconColor="#72c41c"
              filterName="Restrooms"
              filterType={1}
              shape={"circle"}
            />
            {restroomsIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleRestroomsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleRestroomsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={7.8}
          >
            <Filter
              iconColor="#1CA7EC"
              filterName="Elevators"
              filterType={1}
              shape={"square"}
            />
            {elevatorIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleElevatorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleElevatorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={10.5}
          >
            <Filter
              iconColor="#72c41c"
              filterName="Stairs"
              filterType={1}
              shape={"square"}
            />
            {stairsIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleStairsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleStairsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={11.2}
          >
            <Filter
              iconColor="red"
              filterName="Exits"
              filterType={1}
              shape={"square"}
            />
            {exitsIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleExitsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleExitsIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>

          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={10.6}
          >
            <Filter
              iconColor="#e88911"
              filterName="Retail"
              filterType={1}
              shape={"square"}
            />
            {retlIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleRetlIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleRetlIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>

        {/*Floors*/}
        <Stack
          direction="column"
          sx={{ display: "flex", justfiyContent: "start" }}
          spacing={1}
        >
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={13.2}
          >
            <Filter
              iconColor="#012D5A"
              filterName="L1"
              filterType={0}
              shape={"stairs"}
            />
            {ll1IconState === "plus" ? (
              <AddBoxIcon
                onClick={handleLL1IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleLL1IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={13.2}
          >
            <Filter
              iconColor="#012D5A"
              filterName="L2"
              filterType={0}
              shape={"stairs"}
            />
            {ll2IconState === "plus" ? (
              <AddBoxIcon
                onClick={handleLL2IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleLL2IconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={8.1}
          >
            <Filter
              iconColor="#012D5A"
              filterName="1st Floor"
              filterType={0}
              shape={"stairs"}
            />
            {firstFloorIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleFirstFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleFirstFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={4.7}
          >
            <Filter
              iconColor="#012D5A"
              filterName="Second Floor"
              filterType={0}
              shape={"stairs"}
            />
            {secondFloorIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleSecondFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleSecondFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={6.6}
          >
            <Filter
              iconColor="#012D5A"
              filterName="Third Floor"
              filterType={0}
              shape={"stairs"}
            />
            {thirdFloorIconState === "plus" ? (
              <AddBoxIcon
                onClick={handleThirdFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 0, 0.2)" }}
              />
            ) : (
              <CheckBoxIcon
                onClick={handleThirdFloorIconState}
                fontSize="medium"
                sx={{ color: "rgba(0, 0, 255, 0.5)" }}
              />
            )}
          </Stack>
        </Stack>

        {/*Buttons*/}
        <Stack
          direction="column"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            paddingBottom: "10%",
          }}
          spacing={0.5}
        >
          <Button
            variant={"contained"}
            sx={{ display: "flex", justifyContent: "center", minWidth: "90%" }}
            onClick={handleSelectAll}
          >
            Select All
          </Button>

          <Button
            variant={"contained"}
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: "90%",
              backgroundColor: "#D9D9D9",
            }}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );

  const handleStartNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setStartNode(selectedNode.node);
      }
    } else {
      setStartNode(""); // Handle null value if necessary
    }
  };

  const handleEndNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setEndNode(selectedNode.node);
      }
    } else {
      setEndNode(""); // Handle null value if necessary
    }
  };

  const updateNodesData = (newData: Coordinates[]) => {
    setNodesData(newData);
  };

  async function handleSubmit() {
    console.log(startNode);
    console.log(endNode);

    if (startNode.trim() === "" || endNode.trim() === "") {
      setErrorMessage("Please enter both start and end nodes");
      return;
    }

    if (startNode === endNode) {
      setErrorMessage("Please enter different nodes");
      return;
    }

    const request: LocationInfo = { startNode: startNode, endNode: endNode };

    try {
      const response = await axios.post("/api/path", request, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      const path = data.message;
      updateNodesData(path);
      setNodes([startNode, endNode]);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }
  //
  // function handleClear() {
  //   setStartNode(""); // Clear startNode
  //   setEndNode(""); // Clear endNode
  //   //stop animation
  // }

  useEffect(() => {
    if (!nodeDataLoaded) {
      loadNodeData().then((data: MapNodeType[]) => {
        setDBNodesData(data);
        setNodeDataLoaded(true);
      });

      registerFilters();
    } else if (!filtersApplied) {
      console.log("Applying filters");
      determineFilters();
      setFiltersApplied(true);
    }

    console.log(algorithm);
    console.log(startNode);
    console.log(endNode);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const image = new Image();
      image.src = MapImage;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);

        // ctx.fillStyle = "red";

        for (let i = 0; i < filteredNodes.length; i++) {
          if (filteredNodes[i].nodeType == "ELEV") {
            console.log("Elevator");
            console.log(filteredNodes[i].longName);
            ctx.fillStyle = "red";
            ctx.rect(filteredNodes[i].xcoord, filteredNodes[i].ycoord, 20, 20);
          }
          ctx.beginPath();
          // ctx.arc(filteredNodes[i].xcoord, filteredNodes[i].ycoord, 10, 0, 2 * Math.PI);
          // ctx.rect(filteredNodes[i].xcoord, filteredNodes[i].ycoord, 20, 20);

          ctx.fill();
        }
        // ctx.fill();

        if (startNode.trim() === nodes[0] && endNode.trim() === nodes[1]) {
          if (!nodesData) {
            setErrorMessage("There is no path between nodes");
            return;
          }

          let currentTargetIndex = 0;
          let currentX = nodesData[currentTargetIndex].x;
          let currentY = nodesData[currentTargetIndex].y;
          const speed = 1;

          const moveDot = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";

            for (let i = 0; i < nodesData.length; i++) {
              ctx.beginPath();
              ctx.arc(nodesData[i].x, nodesData[i].y, 5, 0, 2 * Math.PI);
              ctx.fill();
            }

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(nodesData[0].x, nodesData[0].y);
            for (let i = 1; i < nodesData.length; i++) {
              ctx.lineTo(nodesData[i].x, nodesData[i].y);
            }
            ctx.stroke();

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI);
            ctx.fill();

            const dx = nodesData[currentTargetIndex].x - currentX;
            const dy = nodesData[currentTargetIndex].y - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
              currentTargetIndex = (currentTargetIndex + 1) % nodesData.length;
            } else {
              currentX += (dx / distance) * speed;
              currentY += (dy / distance) * speed;
            }
            if (currentTargetIndex === 0) {
              currentX = nodesData[0].x;
              currentY = nodesData[0].y;
              currentTargetIndex = 1;
            }

            requestAnimationFrame(moveDot);
          };
          moveDot();
        }
      };
    }
  }, [
    nodeDataLoaded,
    startNode,
    endNode,
    nodes,
    nodesData,
    algorithm,
    populateAutocompleteData,
    determineFilters,
    registerFilters,
    filtersApplied,
    filteredNodes
  ]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBanner2 />

      {/*Side Bar*/}
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
            Navigation
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
              onChange={(event, value) => handleStartNodeChange(value)}
              disablePortal
              id="startNode"
              options={autocompleteNodeData
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((node) => node.label)}
              groupBy={(option) => option.charAt(0).toUpperCase()}
              getOptionLabel={(option) => option}
              sx={{ width: "75%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Starting Location"
                  value={startNode}
                />
              )}
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
              onChange={(event, value) => handleEndNodeChange(value)}
              disablePortal
              id="startNode"
              options={autocompleteNodeData
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((node) => node.label)}
              groupBy={(option) => option.charAt(0).toUpperCase()}
              getOptionLabel={(option) => option}
              sx={{ width: "75%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ending Location"
                  value={endNode}
                />
              )}
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
            <NestedList
              open={open}
              handleClick={handleClick}
              checkedBFS={checkedBFS}
              handleSelectBFS={handleSelectBFS}
              checkedAS={checkedAS}
              handleSelectAS={handleSelectAS}
            />
          </Stack>

          <Stack
            direction={"column"}
            spacing={2}
            sx={{ marginLeft: "10%", marginTop: "4%" }}
          >
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Button
              startIcon={<AltRouteIcon />}
              variant={"contained"}
              sx={{ width: "80%", display: "flex", justifyContent: "center" }}
              onClick={handleSubmit}
            >
              Find Path
            </Button>
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
            <Button
              variant={"contained"}
              sx={{ width: "80%" }}
              onClick={handleButtonClick}
            >
              {checked ? "Add Filters" : "Add Filters"}
            </Button>
            <Button
              variant={"contained"}
              sx={{ width: "80%", backgroundColor: "#D9D9D9" }}
              onClick={handleSelectAll}
            >
              Clear Filters
            </Button>
            {checked && (
              <Slide
                in={checked}
                direction="up"
                style={{
                  zIndex: 1,
                  backgroundColor: "#F5F7FA",
                  position: "absolute",
                  top: "14%",
                  left: "0.5%",
                  width: "100%",
                  minWidth: "100%",
                  height: "100%",
                }}
              >
                {icon}
              </Slide>
            )}
          </Stack>
        </Stack>
      </Drawer>

      <Box
        width={window.innerWidth}
        height={window.innerHeight}
        overflow={"clip"}
      >
        <TransformWrapper>
          <TransformComponent>
            <Draggable>
              <canvas
                ref={canvasRef}
                style={{
                  position: "relative",
                  top: 50,
                  left: 0,
                  minHeight: "100vh",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </Draggable>
          </TransformComponent>
        </TransformWrapper>
      </Box>
      <Legend filterItems={items} />
    </Box>
  );
}

export default Map;
