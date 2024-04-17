import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
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
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import {IDCoordinates} from "common/src/IDCoordinates.ts";
import MapSideBar from "../components/map/MapSideBar.tsx";
import Icon from "../components/map/SlideIcon.tsx";
import BackgroundCanvas from "../components/map/BackgroundCanvas.tsx";
import {Floor, floorStrToObj} from "common/src/map/Floor.ts";
import SymbolCanvas from "../components/map/SymbolCanvas.tsx";
import PathCanvas from "../components/map/PathCanvas.tsx";
import FloorIconsCanvas from "../components/map/FloorIconsCanvas.tsx";
import startIcon from "../images/mapImages/starticon3.png";
import endIcon from "../images/mapImages/endIcon.png";
import IconCanvas from "../components/map/IconCanvas.tsx";


interface TransformState {
  scale: number;
  positionX: number;
  positionY: number
}

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

  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const pathNodesData = useRef<IDCoordinates[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);
  const [updateNodesBetweenFloors, setUpdateNodesBetweenFloors] = useState<boolean>(false);

  const nodesToNextFloor = useRef<Map<IDCoordinates, Floor>>(new Map<IDCoordinates, Floor>());
  const nodesToPrevFloor = useRef<Map<IDCoordinates, Floor>>(new Map<IDCoordinates, Floor>());
  const [pathRenderStatus, setPathRenderStatus] = useState<boolean>(false);
  const [updateFloorIcons, setUpdateFloorIcons] = useState<boolean>(false);

  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  const [updateAnimation, setUpdateAnimation] = useState<boolean>(false);

  const [backgroundRenderStatus, setBackgroundRenderStatus] = useState<boolean>(false);
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
    }
    else if (checkedDFS) {
      setCheckedDFS(false);
    }
    setCheckedBFS(true);
    setAlgorithm("BFS");
  };

  const handleSelectAS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    }
    else if (checkedDFS) {
      setCheckedDFS(false);
    }
    setCheckedAS(true);
    setAlgorithm("A*");
  };

  const handleSelectDFS = () => {
    if (checkedBFS) {
      setCheckedBFS(false);
    }
    else if (checkedAS) {
      setCheckedAS(false);
    }
    setCheckedDFS(true);
    setAlgorithm("DFS");
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
    pathNodesData.current = newData;
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
      !path ? setErrorMessage("There is no path between nodes") : setErrorMessage("");

      setUpdateNodesBetweenFloors(true);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  }

  const handleFloorChange = (newFloor: string) => {
    const newFloorObj = floorStrToObj(newFloor);

    if(!newFloorObj) {
      console.error("New map floor is not a valid floor!");
      return;
    }

    setFloor(newFloorObj);
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
    } else if (!filtersApplied) {
      console.log("Applying filters");
      determineFilters();
      setFiltersApplied(true);
    }
  }, [determineFilters, filtersApplied, nodeDataLoaded]);

  const handleBackgroundRenderStatus = (status: boolean, width: number, height: number) => {
    setBackgroundRenderStatus(status);
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  const handleNodeToFloorCallback = (newNodesToNextFloor: Map<IDCoordinates, Floor>, newNodesToPrevFloor: Map<IDCoordinates, Floor>) => {
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

  const handleTransform = (ref: ReactZoomPanPinchRef, state: { scale: number; positionX: number; positionY: number }) => {
    if(!transformRef.current) transformRef.current = ref;
    transformState.current = state;

    // console.log(state);
  };

  function openModal(){
    setModalIsOpen(true);
  }

  function closeModal(){
    setModalIsOpen(false);
  }

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!iconCanvasRef.current) return;
    const rect = iconCanvasRef.current.getBoundingClientRect();

    const leftOverHeight = window.innerHeight/ (rect.height / transformState.current.scale);
    console.log(leftOverHeight);

    const widthRatio = canvasWidth / window.innerWidth;
    const heightRatio = canvasHeight / window.innerHeight;

    const actualX = ((event.clientX - transformState.current.positionX) / transformState.current.scale) * widthRatio;
    const actualY = ((event.clientY - transformState.current.positionY) / transformState.current.scale) * heightRatio * leftOverHeight;
    console.log(`Adjusted ${actualX} ${actualY}`);

    for (let i = 0; i < filteredNodes.length; i++){
      if (filteredNodes[i].floor === floor){
        const node = filteredNodes[i];
        const distance = Math.sqrt((actualX - node.xcoord)**2 + (actualY - node.ycoord)**2);

        console.log("node: ", node.xcoord, node.ycoord);
        console.log("distance: ", distance);
        console.log("\n");


        if (distance < 25){
          setNodeClicked(node);
          openModal();
          console.log("clicked the node", nodeClicked);
          break;
        }
      }
    }
  };

  const handleStartingLocationClick = () => {
    closeModal();
    setStartNode(nodeClicked!.nodeID);
    // console.log(nodeClicked!.longName);
    // console.log(startNode);
  };

  const handleEndingLocationClick = () => {
    closeModal();
    setEndNode(nodeClicked!.nodeID);

    // console.log(nodeClicked!.longName);
    // console.log(startNode);
  };

  const Modal = () => {

    if (modalIsOpen) {
      const widthRatio = canvasWidth / window.innerWidth;
      const heightRatio = canvasHeight / window.innerHeight;

      const xcoord = nodeClicked!.xcoord / widthRatio;
      const ycoord = nodeClicked!.ycoord / heightRatio;

      return (
        <div style={{
          zIndex: 10,
          left: xcoord + 10 + "px",
          top: ycoord + 10 + "px",
          position: "absolute",
          width: "12%",
          height: "12%",
          backgroundColor: "white",
          border: 2 + "px",
          borderStyle: "solid",
          borderColor: "#186BD9",
          borderRadius: 5 + "px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}>
          <button style={{
            width: "96%",
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "90%",
            color: "#186BD9",
            fontWeight: "bold",
            margin: "2%",
            border: "none",
            backgroundColor: "white",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }} onClick={handleStartingLocationClick}>
            Starting Location
          </button>
          <button style={{
            width: "96%",
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "90%",
            color: "#186BD9",
            fontWeight: "bold",
            margin: "2%",
            border: "none",
            backgroundColor: "white",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }} onClick={handleEndingLocationClick}>
            Ending Location
          </button>
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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: window.innerHeight,
      }}>
        <Box sx={{height: "120px", minHeight: "120px"}}>
          <CssBaseline/>
          <TopBanner2/>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          maxHeight: window.innerHeight,
          minHeight: 0,
          overflow: "clip",
          flexGrow: 1,
          flexShrink: 1,
        }}>
          <Box sx={{
            width: "18%",
            minWidth: "18%",
            minHeight: 0,
          }}>
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
                <TextField {...params} label="Starting Location" value={startNode}/>
              )}
              onChange1={(event, value) => handleEndNodeChange(value)}
              renderInput1={(params) => (
                <TextField {...params} label="Ending Location" value={endNode}/>
              )}
              open={open}
              handleClick={handleClick}
              checkedBFS={checkedBFS}
              handleSelectBFS={handleSelectBFS}
              checkedAS={checkedAS}
              handleSelectAS={handleSelectAS}
              checkedDFS={checkedDFS}
              handleSelectDFS={handleSelectDFS}
              errorMessage={errorMessage}
              onClick={() => {
                handleSubmit().then(() => {
                  setUpdateAnimation(!updateAnimation);
                });
              }}
              onClick1={handleButtonClick}
              checked={checked}
              onClick2={handleSelectAll}
              icon={<Icon
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
              />}
              callback={handleFloorChange}
            />
          </Box>

          <Box
            height={"100%"}
            overflow={"clip"}
          >
            <TransformWrapper
              onTransformed={handleTransform}
              minScale={0.8}
              // initialScale={1.5}
              initialScale={1.0}
              // initialPositionX={-400}
              // initialPositionY={-150}
              initialPositionX={0}
              initialPositionY={0}
            >
              <TransformComponent>
                <Draggable
                  defaultPosition={{x: 0, y: 0}}
                >
                  <>
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
          </Box>
        </Box>

        <Legend filterItems={filterIcons} />
      </Box>
    </>
  );
}

export default MapRoute;
