import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
import NestedList from "../components/map/PathfindingSelect.tsx";
import "./map.css";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import Legend from "../components/map/Legend.tsx";
import { Typography } from "@mui/material";

import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import FilterWithIcon from "../components/filters/FilterSelect.tsx";
import NodeFilter from "common/src/filter/filters/Filter.ts";

import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Floor from "../components/map/FloorTabs.tsx";

import L1MapImage from "../images/mapImages/00_thelowerlevel1.png";
import L2MapImage from "../images/mapImages/00_thelowerlevel2.png";
import FFMapImage from "../images/mapImages/01_thefirstfloor.png";
import SFMapImage from "../images/mapImages/02_thesecondfloor.png";
import TFMapImage from "../images/mapImages/03_thethirdfloor.png";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { Draw } from "../common/Draw.ts";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathCanvasRef = useRef<HTMLCanvasElement>(null);
  const symbolCanvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [nodesData, setNodesData] = useState<IDCoordinates[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  const [renderSymbolCanvas, setRenderSymbolCanvas] = useState<boolean>(false);

  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  const [updateAnimation, setUpdateAnimation] = useState<boolean>(false);

  const [currImage, setCurrImage] = useState<HTMLImageElement>(() => {
    const image = new Image();
    image.src = L1MapImage;
    return image;
  });

  const floor = useRef<string>("L1");
  const [renderBackground, setRenderBackground] = useState<boolean>(false);
  const [reprocessNodes, setReprocessNodes] = useState<boolean>(false);

  /**
   * Pathfinder selection
   */
  const [open, setOpen] = React.useState(false);
  const [checkedBFS, setCheckedBFS] = React.useState(true);
  const [checkedAS, setCheckedAS] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("BFS");

  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  //-----------------------------------------------------------------------------------------

  /**
   * DATA LOADING
   */

  const loadNodeData = async (): Promise<MapNodeType[]> => {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes"))
      .data as MapNodeType[];

    data.forEach((node) => {
      if (!GraphManager.getInstance().getNodeByID(node.nodeID))
        GraphManager.getInstance().nodes.push(new MapNode(node));
    });

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

  //-----------------------------------------------------------------------------------------

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

  /**
   * Slide Container
   */

  const [checked, setChecked] = React.useState(false);

  const handleButtonClick = () => {
    setChecked((prev) => !prev);
  };

  /**
   * FILTER USE STATES
   */

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

  /**
    Update filters in legend when they are selected
   */

  const filterIcons = [
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

  /**
   * Update state of icons to selected or not
   * @param stateSetter change state of set use state
   */

  const handleIconStateToggle = (
    stateSetter: React.Dispatch<React.SetStateAction<"plus" | "check">>,
  ) => {
    return () => {
      stateSetter((prevState) => (prevState === "plus" ? "check" : "plus"));
      setFiltersApplied(false);
    };
  };

  const handleElevatorIconState = handleIconStateToggle(setElevatorIconState);
  const handleStairsIconState = handleIconStateToggle(setStairsIconState);
  const handleExitsIconState = handleIconStateToggle(setExitsIconState);
  const handleInfoIconState = handleIconStateToggle(setInfoIconState);
  const handleServIconState = handleIconStateToggle(setServIconState);
  const handleRestroomsIconState = handleIconStateToggle(setRestroomsIconState);
  const handleConfIconState = handleIconStateToggle(setConfIconState);
  const handleDeptIconState = handleIconStateToggle(setDeptIconState);
  const handleLabsIconState = handleIconStateToggle(setLabsIconState);
  const handleRetlIconState = handleIconStateToggle(setRetlIconState);
  const handleLL1IconState = handleIconStateToggle(setLL1IconState);
  const handleLL2IconState = handleIconStateToggle(setLL2IconState);
  const handleFirstFloorIconState = handleIconStateToggle(
    setFirstFloorIconState,
  );
  const handleSecondFloorIconState = handleIconStateToggle(
    setSecondFloorIconState,
  );
  const handleThirdFloorIconState = handleIconStateToggle(
    setThirdFloorIconState,
  );

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

  /**
   * Create Type, Floor, and Building filters
   */

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

  /**
   * Change list of nodes based on applied filters
   */

  const determineFilters = useCallback(() => {
    const filters: NodeFilter[] = []; // Define the filters array here
    filters.push(
      FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, [
        generateFilterValue(true, "HALL"),
      ])!,
    );

    const applyIconFilter = (
      iconState: string,
      filterName: FilterName,
      filterValue: string,
    ) => {
      if (iconState === "plus") {
        filters.push(
          FilterManager.getInstance().getConfiguredFilter(filterName, [
            generateFilterValue(true, filterValue),
          ])!,
        );
      }
    };

    applyIconFilter(ll1IconState, FilterName.FLOOR, "L1");
    applyIconFilter(ll2IconState, FilterName.FLOOR, "L2");
    applyIconFilter(firstFloorIconState, FilterName.FLOOR, "1");
    applyIconFilter(secondFloorIconState, FilterName.FLOOR, "2");
    applyIconFilter(thirdFloorIconState, FilterName.FLOOR, "3");
    applyIconFilter(elevatorIconState, FilterName.TYPE, "ELEV");
    applyIconFilter(stairsIconState, FilterName.TYPE, "STAI");
    applyIconFilter(servIconState, FilterName.TYPE, "SERV");
    applyIconFilter(infoIconState, FilterName.TYPE, "INFO");
    applyIconFilter(restroomsIconState, FilterName.TYPE, "REST");
    applyIconFilter(exitsIconState, FilterName.TYPE, "EXIT");
    applyIconFilter(confIconState, FilterName.TYPE, "CONF");
    applyIconFilter(deptIconState, FilterName.TYPE, "DEPT");
    applyIconFilter(labsIconState, FilterName.TYPE, "LABS");
    applyIconFilter(retlIconState, FilterName.TYPE, "RETL");

    console.log("Filtering");

    const newFilteredNodes: MapNode[] =
      FilterManager.getInstance().applyFilters(
        filters,
        GraphManager.getInstance().nodes,
      );

    // Update filteredNodes state with the filtered result
    setFilteredNodes(newFilteredNodes);
    // Update autocomplete data based on the filtered nodes
    populateAutocompleteData(newFilteredNodes);
  }, [
    populateAutocompleteData,
    ll1IconState,
    ll2IconState,
    elevatorIconState,
    stairsIconState,
    servIconState,
    infoIconState,
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

  /**
   * Pop up window with filters on side bar
   */

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
          <FilterWithIcon
            iconColor="#1CA7EC"
            filterName="Conference"
            filterType={1}
            shape={"pentagon"}
            iconState={confIconState}
            handleIconState={handleConfIconState}
          />

          <FilterWithIcon
            iconColor="#72c41c"
            filterName="Department"
            filterType={1}
            shape={"pentagon"}
            iconState={deptIconState}
            handleIconState={handleDeptIconState}
          />

          <FilterWithIcon
            iconColor="#e88911"
            filterName="Labs"
            filterType={1}
            shape={"pentagon"}
            iconState={labsIconState}
            handleIconState={handleLabsIconState}
          />

          <FilterWithIcon
            iconColor="#e88911"
            filterName="Service"
            filterType={1}
            shape={"circle"}
            iconState={servIconState}
            handleIconState={handleServIconState}
          />

          <FilterWithIcon
            iconColor="#1CA7EC"
            filterName="Info"
            filterType={1}
            shape={"circle"}
            iconState={infoIconState}
            handleIconState={handleInfoIconState}
          />

          <FilterWithIcon
            iconColor="#72c41c"
            filterName="Restrooms"
            filterType={1}
            shape={"circle"}
            iconState={restroomsIconState}
            handleIconState={handleRestroomsIconState}
          />

          <FilterWithIcon
            iconColor="#1CA7EC"
            filterName="Elevators"
            filterType={1}
            shape={"square"}
            iconState={elevatorIconState}
            handleIconState={handleElevatorIconState}
          />

          <FilterWithIcon
            iconColor="#72c41c"
            filterName="Stairs"
            filterType={1}
            shape={"square"}
            iconState={stairsIconState}
            handleIconState={handleStairsIconState}
          />

          <FilterWithIcon
            iconColor="red"
            filterName="Exits"
            filterType={1}
            shape={"square"}
            iconState={exitsIconState}
            handleIconState={handleExitsIconState}
          />

          <FilterWithIcon
            iconColor="#e88911"
            filterName="Retail"
            filterType={1}
            shape={"square"}
            iconState={retlIconState}
            handleIconState={handleRetlIconState}
          />

          <FilterWithIcon
            iconColor="#012D5A"
            filterName="L1"
            filterType={0}
            shape={"stairs"}
            iconState={ll1IconState}
            handleIconState={handleLL1IconState}
          />

          <FilterWithIcon
            iconColor="#012D5A"
            filterName="L2"
            filterType={0}
            shape={"stairs"}
            iconState={ll2IconState}
            handleIconState={handleLL2IconState}
          />

          <FilterWithIcon
            iconColor="#012D5A"
            filterName="1st Floor"
            filterType={0}
            shape={"stairs"}
            iconState={firstFloorIconState}
            handleIconState={handleFirstFloorIconState}
          />

          <FilterWithIcon
            iconColor="#012D5A"
            filterName="Second Floor"
            filterType={0}
            shape={"stairs"}
            iconState={secondFloorIconState}
            handleIconState={handleSecondFloorIconState}
          />

          <FilterWithIcon
            iconColor="#012D5A"
            filterName="Third Floor"
            filterType={0}
            shape={"stairs"}
            iconState={thirdFloorIconState}
            handleIconState={handleThirdFloorIconState}
          />
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

  const updateNodesData = (newData: IDCoordinates[]) => {
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

    const request: LocationInfo = {
      algorithm: algorithm,
      startNode: startNode,
      endNode: endNode,
    };

    try {
      const response = await axios.post("/api/path", request, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      const path = data.message;

      console.log(path);

      updateNodesData(path);
      setNodes([startNode, endNode]);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }

  const handleFloorChange = (newFloor: string) => {
    const newImage = new Image();

    switch (newFloor) {
      case "L1":
        newImage.src = L1MapImage;
        floor.current = "L1";
        break;
      case "L2":
        newImage.src = L2MapImage;
        floor.current = "L2";
        break;
      case "1":
        newImage.src = FFMapImage;
        floor.current = "1";
        break;
      case "2":
        newImage.src = SFMapImage;
        floor.current = "2";
        break;
      case "3":
        newImage.src = TFMapImage;
        floor.current = "3";
        break;
      default:
        console.error("Returned map floor is not assigned to an image");
        return;
    }

    setRenderSymbolCanvas(true);
    setRenderBackground(true);
    setReprocessNodes(true);
    setCurrImage(newImage);
  };

  /**
   * useEffect to just load the node data. Only called when the flags determining loading data are changed
   */
  useEffect(() => {
    console.log("Loading Data");
    if (!nodeDataLoaded) {
      loadNodeData().then(() => {
        setNodeDataLoaded(true);
      });

      registerFilters();
    } else if (!filtersApplied) {
      console.log("Applying filters");
      determineFilters();
      setFiltersApplied(true);
    }

    setRenderSymbolCanvas(true);
    setRenderBackground(true);
  }, [
    nodeDataLoaded,
    filtersApplied,
    determineFilters,
    registerFilters,
    populateAutocompleteData,
  ]);

  useEffect(() => {
    if (symbolCanvasRef.current && renderSymbolCanvas) {
      console.log("Rendering symbol canvas");
      const canvas: HTMLCanvasElement = symbolCanvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      const draw = new Draw(ctx);

      ctx.clearRect(0, 0, currImage.width, currImage.height);

      const filters: NodeFilter =
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(false, floor.current),
        ])!;

      const nodesOnFloor = FilterManager.getInstance().applyFilters(
        [filters],
        filteredNodes,
      );

      console.log("NodesOnFloor:");
      console.log(nodesOnFloor);

      for (let i = 0; i < nodesOnFloor.length; i++) {
        if (nodesOnFloor[i].nodeType == "ELEV") {
          draw.drawRectangle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            20,
            20,
            "#1CA7EC",
            "black",
            2,
          );
        } else if (nodesOnFloor[i].nodeType == "STAI") {
          draw.drawRectangle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            20,
            20,
            "#72c41c",
            "black",
            2,
          );
        } else if (nodesOnFloor[i].nodeType == "EXIT") {
          draw.drawRectangle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            20,
            20,
            "red",
            "black",
            2,
          );
        } else if (nodesOnFloor[i].nodeType == "RETL") {
          draw.drawRectangle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            20,
            20,
            "#e88911",
            "black",
            2,
          );
        } else if (nodesOnFloor[i].nodeType == "SERV") {
          draw.drawCircle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            12,
            "#e88911",
            "black",
            4,
          );
        } else if (nodesOnFloor[i].nodeType == "INFO") {
          draw.drawCircle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            12,
            "#1CA7EC",
            "black",
            4,
          );
        } else if (nodesOnFloor[i].nodeType == "REST") {
          draw.drawCircle(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            12,
            "#72c41c",
            "black",
            4,
          );
        } else if (nodesOnFloor[i].nodeType == "CONF") {
          draw.drawPentagon(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            15,
            "#1CA7EC",
            "black",
            4,
          );
        } else if (nodesOnFloor[i].nodeType == "DEPT") {
          draw.drawPentagon(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            15,
            "#72c41c",
            "black",
            4,
          );
        } else if (nodesOnFloor[i].nodeType == "LABS") {
          draw.drawPentagon(
            nodesOnFloor[i].xcoord,
            nodesOnFloor[i].ycoord,
            15,
            "#e88911",
            "black",
            4,
          );
        }
      }
      setRenderSymbolCanvas(false);
    }
  }, [currImage.height, currImage.width, filteredNodes, renderSymbolCanvas]);

  useEffect(() => {
    currImage.onload = () => {
      if (renderBackground) {
        console.log("Rendering Canvas");
        if (canvasRef.current) {
          const canvas: HTMLCanvasElement = canvasRef.current;
          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = currImage.width;
          canvas.height = currImage.height;

          ctx.drawImage(currImage, 0, 0, currImage.width, currImage.height);
        }

        if (pathCanvasRef.current) {
          const canvas: HTMLCanvasElement = pathCanvasRef.current;
          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = currImage.width;
          canvas.height = currImage.height;

          ctx.clearRect(0, 0, currImage.width, currImage.height);
        }

        if (symbolCanvasRef.current) {
          const canvas: HTMLCanvasElement = symbolCanvasRef.current;
          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = currImage.width;
          canvas.height = currImage.height;

          ctx.clearRect(0, 0, currImage.width, currImage.height);

          setRenderSymbolCanvas(true);
        }
        setRenderBackground(false);
      }
    };
  }, [currImage, renderBackground, floor]);

  useEffect(() => {
    console.log("Determining nodes on floor...");
    const includedNodesOnFloor: IDCoordinates[][] = [];

    let currPath: IDCoordinates[] = [];

    for (let i = 0; i < nodesData.length; i++) {
      if (
        GraphManager.getInstance().getNodeByID(nodesData[i].nodeID)!.floor ==
        floor.current
      ) {
        currPath.push(nodesData[i]);
      } else {
        if (currPath.length != 0) {
          includedNodesOnFloor.push(currPath);
          currPath = [];
        }
      }
    }

    if (currPath.length != 0) includedNodesOnFloor.push(currPath);

    console.log(`Determined nodes on floor`);
    console.log(includedNodesOnFloor);
    console.log(reprocessNodes);

    if (pathCanvasRef.current) {
      const canvas: HTMLCanvasElement = pathCanvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      if (includedNodesOnFloor.length != 0) {
        console.log("Processing canvas");

        if (startNode.trim() === nodes[0] && endNode.trim() === nodes[1]) {
          if (!nodesData) {
            setErrorMessage("There is no path between nodes");
            return;
          }

          let currentTargetIndex = 0;
          let currentPathIndex = 0;
          let currentX =
            includedNodesOnFloor[currentPathIndex][currentTargetIndex]
              .coordinates.x;
          let currentY =
            includedNodesOnFloor[currentPathIndex][currentTargetIndex]
              .coordinates.y;
          const speed = 1;

          const moveDot = (origFloor: string) => {
            if (floor.current != origFloor) {
              console.log("Floor changed, stopping previous animation");
              return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";

            for (let i = 0; i < includedNodesOnFloor.length; i++) {
              for (let j = 0; j < includedNodesOnFloor[i].length; j++) {
                ctx.beginPath();
                ctx.arc(
                  includedNodesOnFloor[i][j].coordinates.x,
                  includedNodesOnFloor[i][j].coordinates.y,
                  5,
                  0,
                  2 * Math.PI,
                );
                ctx.fill();
              }
            }

            ctx.lineWidth = 3;
            ctx.beginPath();

            for (let i = 0; i < includedNodesOnFloor.length; i++) {
              ctx.moveTo(
                includedNodesOnFloor[i][0].coordinates.x,
                includedNodesOnFloor[i][0].coordinates.y,
              );
              for (let j = 1; j < includedNodesOnFloor[i].length; j++) {
                ctx.lineTo(
                  includedNodesOnFloor[i][j].coordinates.x,
                  includedNodesOnFloor[i][j].coordinates.y,
                );
              }
            }

            ctx.stroke();

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
            ctx.fill();

            const dx =
              includedNodesOnFloor[currentPathIndex][currentTargetIndex]
                .coordinates.x - currentX;
            const dy =
              includedNodesOnFloor[currentPathIndex][currentTargetIndex]
                .coordinates.y - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
              currentTargetIndex =
                (currentTargetIndex + 1) %
                includedNodesOnFloor[currentPathIndex].length;
            } else {
              currentX += (dx / distance) * speed;
              currentY += (dy / distance) * speed;
            }
            if (currentTargetIndex === 0) {
              currentPathIndex =
                (currentPathIndex + 1) % includedNodesOnFloor.length;
              currentX =
                includedNodesOnFloor[currentPathIndex][currentTargetIndex]
                  .coordinates.x;
              currentY =
                includedNodesOnFloor[currentPathIndex][currentTargetIndex]
                  .coordinates.y;
              currentTargetIndex = 1;
            }
            requestAnimationFrame(() => moveDot(origFloor));
          };
          moveDot(floor.current);
        }
      } else {
        console.log("Clearing path canvas");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setReprocessNodes(false);
  }, [
    endNode,
    filteredNodes,
    floor,
    nodes,
    nodesData,
    reprocessNodes,
    startNode,
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
              onClick={() => {
                handleSubmit().then(() => {
                  setUpdateAnimation(!updateAnimation);
                });
              }}
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
            <Floor callback={handleFloorChange} />
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
              <>
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
                <canvas
                  ref={symbolCanvasRef}
                  style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
                <canvas
                  ref={pathCanvasRef}
                  style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </>
            </Draggable>
          </TransformComponent>
        </TransformWrapper>
      </Box>
      <Legend filterItems={filterIcons} />
    </Box>
  );
}

export default Map;
