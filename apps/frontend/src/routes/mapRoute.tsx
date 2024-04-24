import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import styled from '@emotion/styled';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import "./map.css";
import {LocationInfo} from "common/src/LocationInfo.ts";
import {MapNodeType} from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import Legend from "../components/map/Legend.tsx";

import FilterManager, {generateFilterValue,} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import NodeFilter from "common/src/filter/filters/Filter.ts";
import Draggable from "react-draggable";
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper,} from "react-zoom-pan-pinch";

import MapSideBar from "../components/map/MapSideBar.tsx";
import Icon from "../components/map/SlideIcon.tsx";
import TextIcon from "../components/map/TextDirectionsSlide.tsx";
import BackgroundCanvas from "../components/map/BackgroundCanvas.tsx";
import {Floor, floorStrToObj} from "common/src/map/Floor.ts";
import SymbolCanvas from "../components/map/SymbolCanvas.tsx";
import PathCanvas from "../components/map/PathCanvas.tsx";
import FloorIconsCanvas from "../components/map/FloorIconsCanvas.tsx";
import startIcon from "../images/mapImages/starticon3.png";
import endIcon from "../images/mapImages/endIcon.png";
import NearMeIcon from '@mui/icons-material/NearMe';
import IconCanvas from "../components/map/IconCanvas.tsx";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import ToggleButton from "../components/map/MapToggleBar.tsx";
import {IconButton, Stack} from "@mui/material";


interface TransformState {
  scale: number;
  positionX: number;
  positionY: number;
}

const NodeButtons = styled("button")({
  cursor: "pointer",
  border: "1px solid white",
  outline: "none",
  backgroundColor: "white",

  "&:active": {
    outline: "none"
  },
  "&:hover": {
    borderColor: "#186BD9",
  },
});

function MapRoute() {
  const iconCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const transformState = useRef<TransformState>({
    scale: 0,
    positionX: 0,
    positionY: 0,
  });

  // adding setting the node click
  const [nodeClicked, setNodeClicked] = useState<MapNode | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // State to control visibility of legend

  const toggleLegend = () => {
    setIsOpen(!isOpen); // Toggle the visibility of the legend
  };

  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const pathNodesData = useRef<TypeCoordinates[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);
  const [updateNodesBetweenFloors, setUpdateNodesBetweenFloors] =
    useState<boolean>(false);
  const [textDirections, setTextDirections] = useState<boolean>(false);

  const nodesToNextFloor = useRef<Map<TypeCoordinates, Floor>>(
    new Map<TypeCoordinates, Floor>(),
  );
  const nodesToPrevFloor = useRef<Map<TypeCoordinates, Floor>>(
    new Map<TypeCoordinates, Floor>(),
  );
  const [pathRenderStatus, setPathRenderStatus] = useState<boolean>(false);
  const [updateFloorIcons, setUpdateFloorIcons] = useState<boolean>(false);

  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  const [updateAnimation, setUpdateAnimation] = useState<boolean>(false);

  const [backgroundRenderStatus, setBackgroundRenderStatus] =
    useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const [floor, setFloor] = useState<Floor>(Floor.L1);

  /**
   * Pathfinder selection
   */
  const [open, setOpen] = React.useState(false);
  const [checkedBFS, setCheckedBFS] = React.useState(false);
  const [checkedAS, setCheckedAS] = React.useState(true);
  const [checkedDFS, setCheckedDFS] = React.useState(false);
  const [checkedDijkstra, setCheckedDijkstra] = React.useState(false);
  const [algorithm, setAlgorithm] = React.useState("A*");
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
    } else if (checkedDFS) {
      setCheckedDFS(false);
    } else if (checkedDijkstra) {
      setCheckedDijkstra(false);
    }
    setCheckedBFS(true);
    setAlgorithm("BFS");
  };

  const handleSelectAS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    } else if (checkedDFS) {
      setCheckedDFS(false);
    } else if (checkedDijkstra) {
      setCheckedDijkstra(false);
    }

    setCheckedAS(true);
    setAlgorithm("A*");
  };

  const handleSelectDFS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    } else if (checkedAS) {
      setCheckedAS(false);
    } else if (checkedDijkstra) {
      setCheckedDijkstra(false);
    }

    setCheckedDFS(true);
    setAlgorithm("DFS");
  };

  const handleSelectDijkstra = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    } else if (checkedAS) {
      setCheckedAS(false);
    } else if (checkedDFS) {
      setCheckedDFS(false);
    }
    setCheckedDijkstra(true);
    setAlgorithm("Dijkstra");
  };

  /**
   * Slide Container
   */

  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const handleButtonClick = () => {
    setChecked((prev) => !prev);
  };
  const handleButtonClick2 = () => {
    setChecked2((prev) => !prev);
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
            shape: "conf",
          },
        ]
      : []),
    ...(deptIconState === "check"
      ? [
          {
            iconColor: "#72c41c",
            filterName: "Department",
            filterType: 1,
            shape: "dept",
          },
        ]
      : []),
    ...(labsIconState === "check"
      ? [
          {
            iconColor: "#e88911",
            filterName: "Labs",
            filterType: 1,
            shape: "labs",
          },
        ]
      : []),
    ...(servIconState === "check"
      ? [
          {
            iconColor: "#e88911",
            filterName: "Service",
            filterType: 1,
            shape: "service",
          },
        ]
      : []),
    ...(infoIconState === "check"
      ? [
          {
            iconColor: "#1CA7EC",
            filterName: "Info",
            filterType: 1,
            shape: "info",
          },
        ]
      : []),
    ...(restroomsIconState === "check"
      ? [
          {
            iconColor: "#72c41c",
            filterName: "Restrooms",
            filterType: 1,
            shape: "bathroom",
          },
        ]
      : []),
    ...(retlIconState === "check"
      ? [
        {
          iconColor: "#e88911",
          filterName: "Retail",
          filterType: 1,
          shape: "retail",
        },
      ]
      : []),
    ...(stairsIconState === "check"
      ? [
        {
          iconColor: "#72c41c",
          filterName: "Stairs",
          filterType: 1,
          shape: "stairs",
        },
      ]
      : []),
    ...(elevatorIconState === "check"
      ? [
          {
            iconColor: "#1CA7EC",
            filterName: "Elevators",
            filterType: 1,
            shape: "elevators",
          },
        ]
      : []),

    ...(exitsIconState === "check"
      ? [
          {
            iconColor: "red",
            filterName: "Exits",
            filterType: 1,
            shape: "exit",
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

  const handleStartNodeChange = (value: string | null) => {
    if (value) {
      console.log(`Value: ${value}`);
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setStartNode(selectedNode.node);
        console.log(`Starting node: ${startNode}`);
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

  const updateNodesData = (newData: TypeCoordinates[]) => {
    pathNodesData.current = newData;
    // console.log("printing use ref now", pathNodesData.current);
  };

  async function handleSubmit() {
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

      updateNodesData(path);
      setFloor(findStartingFloor() as Floor);

      !path
        ? setErrorMessage("There is no path between nodes")
        : setErrorMessage("");
      setTextDirections(true);
      setUpdateNodesBetweenFloors(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }

  const handleFloorChange = (newFloor: string) => {
    const newFloorObj = floorStrToObj(newFloor);



    // CHANGE FLOORTABS
    if (!newFloorObj) {
      console.error("New map floor is not a valid floor!");
      return;
    }

    setFloor(newFloorObj);
    console.log("NEW FLOOR");
  };

  function findStartingFloor() {
    for (let i = 0; i < filteredNodes.length; i++) {
      if (filteredNodes[i].nodeID === startNode) {
        return filteredNodes[i].floor.toString(); // Return floor as a string
      }
    }
  }

  /**
   * useEffect to just load the node data. Only called when the flags determining loading data are changed
   */
  useEffect(() => {
    console.log("Loading Data");

    if (!nodeDataLoaded) {
      loadNodeData().then(() => {
        setNodeDataLoaded(true);
      });
    } else if (!filtersApplied) {
      console.log("Applying filters");
      determineFilters();
      setFiltersApplied(true);
    }
  }, [determineFilters, filtersApplied, nodeDataLoaded]);

  const handleBackgroundRenderStatus = (
    status: boolean,
    width: number,
    height: number,
  ) => {
    setBackgroundRenderStatus(status);
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  const handleNodeToFloorCallback = (
    newNodesToNextFloor: Map<TypeCoordinates, Floor>,
    newNodesToPrevFloor: Map<TypeCoordinates, Floor>,
  ) => {
    nodesToNextFloor.current = newNodesToNextFloor;
    nodesToPrevFloor.current = newNodesToPrevFloor;

    setUpdateFloorIcons(true);
    setUpdateNodesBetweenFloors(false);
    console.log("Updated node to next and previous floor");
  };

  const handlePathRenderStatus = (status: boolean) => {
    setPathRenderStatus(status);
  };

  const handleIconCallback = (ref: HTMLCanvasElement) => {
    iconCanvasRef.current = ref;
  };

  const handleTransform = (
    ref: ReactZoomPanPinchRef,
    state: { scale: number; positionX: number; positionY: number },
  ) => {
    if (!transformRef.current) transformRef.current = ref;
    transformState.current = state;

    // console.log(state);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!iconCanvasRef.current) return;
    const rect = iconCanvasRef.current.getBoundingClientRect();

    const leftOverHeight =
      (window.innerHeight - 120) / (rect.height / transformState.current.scale);
    console.log(leftOverHeight);

    const widthRatio =
      canvasWidth / (window.innerWidth - window.innerWidth * 0.18);
    const heightRatio = canvasHeight / (window.innerHeight - 120);

    const actualX =
      ((event.clientX -
        transformState.current.positionX -
        window.innerWidth * 0.18) /
        transformState.current.scale) *
      widthRatio;
    const actualY =
      ((event.clientY - transformState.current.positionY - 120) /
        transformState.current.scale) *
      heightRatio *
      leftOverHeight;
    console.log(`Adjusted ${actualX} ${actualY}`);

    for (let i = 0; i < filteredNodes.length; i++) {
      if (filteredNodes[i].floor === floor) {
        const node = filteredNodes[i];
        const distance = Math.sqrt(
          (actualX - node.xcoord) ** 2 + (actualY - node.ycoord) ** 2,
        );

        console.log("node: ", node.xcoord, node.ycoord);
        console.log("distance: ", distance);
        console.log("\n");

        if (distance < 25) {
          setNodeClicked(node);
          openModal();
          console.log("clicked the node", nodeClicked);

          // Switch to floor when clicking next/prev floor icons
          for (const key of nodesToNextFloor.current.keys()) {
            if (key.nodeID === filteredNodes[i].nodeID) {
              closeModal();
              setFloor(nodesToNextFloor.current.get(key)!);
            }
          }
          for (const key of nodesToPrevFloor.current.keys()) {
            if (key.nodeID === filteredNodes[i].nodeID) {
              closeModal();
              setFloor(nodesToPrevFloor.current.get(key)!);
            }
          }

          break;
        } else closeModal();
      }
    }
  };

  const handleStartingLocationClick = () => {
    closeModal();
    setStartNode(nodeClicked!.nodeID);
    handleStartNodeChange(nodeClicked!.longName);
    console.log(nodeClicked!.longName);
    console.log(startNode);
  };

  const handleEndingLocationClick = () => {
    closeModal();
    setEndNode(nodeClicked!.nodeID);
    handleStartNodeChange(nodeClicked!.nodeID);

    // const handleFocus = (event) => event.target.select();
    // if (!el_down) return;
    // el_down.innerHTML = startNode;

    // console.log(nodeClicked!.longName);
    console.log(startNode);
  };

  const Modal = () => {
    if (modalIsOpen) {
      const widthRatio =
        canvasWidth / (window.innerWidth - window.innerWidth * 0.18);
      const heightRatio = canvasHeight / (window.innerHeight - 120);

      const xcoord = nodeClicked!.xcoord / widthRatio;
      const ycoord = nodeClicked!.ycoord / heightRatio;

      return (
        <div
          style={{
            zIndex: 10,
            left: xcoord + 10 + "px",
            top: ycoord + 35 + "px",
            position: "absolute",
            width: "7%",
            height: "4%",
            backgroundColor: "white",
            border: 2 + "px",
            borderStyle: "solid",
            borderColor: "#186BD9",
            borderRadius: 5 + "px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <NodeButtons
            style={{
              width: "96%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40%",
              color: "#186BD9",
              fontWeight: "bold",
              margin: "2%",
              // backgroundColor: "white",
              boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
            }}
            onClick={handleStartingLocationClick}
          >
            Starting Location
          </NodeButtons>
          <NodeButtons
            style={{
              width: "96%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40%",
              color: "#186BD9",
              fontWeight: "bold",
              margin: "2%",
              // backgroundColor: "white",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            onClick={handleEndingLocationClick}
          >
            Ending Location
          </NodeButtons>
        </div>
      );
    }

    return;
  };

  return (
    <>
      <img
        src={startIcon}
        className={"start"}
        alt="icon"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          zIndex: -1,
        }}
      />
      <img
        src={endIcon}
        className={"end"}
        alt="icon"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: window.innerHeight,
        }}
      >
        <Box sx={{ height: "120px", minHeight: "120px" }}>
          <CssBaseline />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            maxHeight: window.innerHeight,
            minHeight: 0,
            overflow: "clip",
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <Box
            sx={{
              width: "18%",
              minWidth: "18%",
              backgroundColor: "#D9DAD7",
              height: "100vh",
              display: "flex"
            }}
          >
            {/*Side Bar*/}
            <MapSideBar
              title="Navigation"
              onChange={(event, value) => handleStartNodeChange(value)}
              autocompleteNodeData={autocompleteNodeData}
              compareFn={(a, b) => a.label.localeCompare(b.label)}
              nodeToLabelIdCallback={(node) => node.label}
              groupBy={(option) => option.charAt(0).toUpperCase()}
              optionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Starting Location"
                  value={startNode}
                />
              )}
              onChange1={(event, value) => handleEndNodeChange(value)}
              renderInput1={(params) => (
                <TextField
                  {...params}
                  id={"endNodeID"}
                  label="Ending Location"
                  value={endNode}
                />
              )}
              open={open}
              handleClick={handleClick}
              checkedBFS={checkedBFS}
              handleSelectBFS={handleSelectBFS}
              checkedAS={checkedAS}
              handleSelectAS={handleSelectAS}
              checkedDFS={checkedDFS}
              handleSelectDFS={handleSelectDFS}
              checkedDijkstra={checkedDijkstra}
              handleSelectDijkstra={handleSelectDijkstra}
              errorMessage={errorMessage}
              onClick={() => {
                handleSubmit().then(() => {
                  setUpdateAnimation(!updateAnimation);
                });
              }}
              onClick1={handleButtonClick}
              checked={checked}
              onClick2={handleSelectAll}
              checked2={checked2}
              onClick3={handleButtonClick2}
              text={textDirections}
              icon={
                <Icon
                  handleButtonClick={handleButtonClick}
                  checked={false}
                  confIconState={confIconState}
                  deptIconState={deptIconState}
                  labsIconState={labsIconState}
                  servIconState={servIconState}
                  infoIconState={infoIconState}
                  restroomsIconState={restroomsIconState}
                  elevatorIconState={elevatorIconState}
                  stairsIconState={stairsIconState}
                  exitsIconState={exitsIconState}
                  retlIconState={retlIconState}
                  ll1IconState={ll1IconState}
                  ll2IconState={ll2IconState}
                  firstFloorIconState={firstFloorIconState}
                  secondFloorIconState={secondFloorIconState}
                  thirdFloorIconState={thirdFloorIconState}
                  handleConfIconState={handleConfIconState}
                  handleDeptIconState={handleDeptIconState}
                  handleLabsIconState={handleLabsIconState}
                  handleServIconState={handleServIconState}
                  handleInfoIconState={handleInfoIconState}
                  handleRestroomsIconState={handleRestroomsIconState}
                  handleElevatorIconState={handleElevatorIconState}
                  handleStairsIconState={handleStairsIconState}
                  handleExitsIconState={handleExitsIconState}
                  handleRetlIconState={handleRetlIconState}
                  handleLL1IconState={handleLL1IconState}
                  handleLL2IconState={handleLL2IconState}
                  handleFirstFloorIconState={handleFirstFloorIconState}
                  handleSecondFloorIconState={handleSecondFloorIconState}
                  handleThirdFloorIconState={handleThirdFloorIconState}
                  handleSelectAll={handleSelectAll}
                  handleClearAll={handleClearAll}
                />
              }
              icon2={<TextIcon
                handleButtonClick2={handleButtonClick2}
                checked2={false}
                nodesData={pathNodesData.current}
                onClickText={setFloor}/>
              }

              callback={handleFloorChange}
            />
          </Box>

          <Box height={"100%"} overflow={"clip"}>
            <TransformWrapper
              onTransformed={handleTransform}
              minScale={0.8}
              initialScale={1.0}
              // initialScale={2.0}
              // initialPositionX={-300}
              // initialPositionY={-100}
              initialPositionX={0}
              initialPositionY={0}
            >
              <TransformComponent>
                <Draggable defaultPosition={{ x: 0, y: 0 }}>
                  <>
                    <Modal />
                    <BackgroundCanvas
                      style={{
                        position: "relative",
                        // minHeight: "100vh",
                        // maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      floor={floor}
                      renderStatusCallback={handleBackgroundRenderStatus}
                    />
                    <SymbolCanvas
                      style={{
                        position: "absolute",
                        // minHeight: "100vh",
                        // maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
                      filtersApplied={filtersApplied}
                      filteredNodes={filteredNodes}
                      floor={floor}
                    />
                    <PathCanvas
                      style={{
                        position: "absolute",
                        // minHeight: "100vh",
                        // maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      updateNodesBetweenFloors={updateNodesBetweenFloors}
                      width={canvasWidth}
                      height={canvasHeight}
                      floor={floor}
                      pathNodesData={pathNodesData.current}
                      floorConnectionCallback={handleNodeToFloorCallback}
                      pathRenderStatusCallback={handlePathRenderStatus}
                      startNode={startNode}
                      endNode={endNode}
                      iconCanvasRef={iconCanvasRef.current!}
                    />
                    <IconCanvas
                      style={{
                        position: "absolute",
                        // minHeight: "100vh",
                        // maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
                      refCallback={handleIconCallback}
                    />
                    <FloorIconsCanvas
                      style={{
                        position: "absolute",
                        // minHeight: "100vh",
                        // maxHeight: "100%",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      pathRendered={pathRenderStatus}
                      updateFloorIcons={updateFloorIcons}
                      width={canvasWidth}
                      height={canvasHeight}
                      floor={floor}
                      nodesToNextFloor={nodesToNextFloor.current}
                      nodesToPrevFloor={nodesToPrevFloor.current}
                      onClick={handleCanvasClick}
                    />
                  </>
                </Draggable>
              </TransformComponent>
            </TransformWrapper>

            <Stack direction={"row"}>
              <Box
                position={"fixed"}
                right={"0.5%"}
                sx={{
                  top: "120px"
                }}
              >
                {/* Toggle button */}
                <ToggleButton onClick={toggleLegend} buttonText={isOpen ? "Hide Legend" : "Show Legend"} />
              </Box>
              {isOpen && (
                <Legend filterItems={filterIcons} />
              )}
            </Stack>

              <Box
                position={"absolute"}
                top={"93%"}
                left={"21%"}
              >
                <IconButton onClick={() => findStartingFloor() && setFloor(findStartingFloor() as Floor)} aria-label="start"
                            sx={{color: "#186BD9",
                              backgroundColor: "white",
                              border: "1px solid #186BD9",
                              "&:hover": {
                               backgroundColor: "white"},
                            }}>
                  <NearMeIcon />
                </IconButton>
              </Box>

          </Box>

        </Box>


      </Box>
    </>
  );
}

export default MapRoute;
