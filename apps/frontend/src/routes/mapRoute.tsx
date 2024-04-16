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
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

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


function MapRoute() {
  const iconCanvasRef = useRef<HTMLCanvasElement>(null);

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

  /*
  if (iconCanvasRef.current) {
          const canvas: HTMLCanvasElement = iconCanvasRef.current;
          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = currImage.width;
          canvas.height = currImage.height;

          ctx.clearRect(0, 0, currImage.width, currImage.height);

          setRenderSymbolCanvas(true);
        }
   */

  /*
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

    if (pathCanvasRef.current && iconCanvasRef.current) {
      const canvas: HTMLCanvasElement = pathCanvasRef.current;
      const iconCanvas: HTMLCanvasElement = iconCanvasRef.current;

      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      const iconCtx: CanvasRenderingContext2D | null = iconCanvas.getContext("2d");


      if (!ctx) return;
      if (!iconCtx) return;


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
            ctx.fillStyle = "blue";


            for (let i = 0; i < includedNodesOnFloor.length; i++) {
              for (let j = 0; j < includedNodesOnFloor[i].length; j++) {
                ctx.beginPath();

                if (includedNodesOnFloor[i][j].nodeID === startNode) { // Check if it's the first element
                  const image: HTMLImageElement | null = document.querySelector(`.start`);
                  if (!image) return;

                  iconCtx.drawImage(image, includedNodesOnFloor[i][j].coordinates.x - 60, includedNodesOnFloor[i][j].coordinates.y - 45, 115, 85);

                }

                if (includedNodesOnFloor[i][j].nodeID === endNode) { // Check if it's the last element
                  const image2: HTMLImageElement | null = document.querySelector(`.end`);
                  if (!image2) return;

                  iconCtx.drawImage(image2, includedNodesOnFloor[i][j].coordinates.x - 63, includedNodesOnFloor[i][j].coordinates.y - 65, 180, 150); // Adjust iconWidth and iconHeight as needed

                }

                else {
                  ctx.arc(
                    includedNodesOnFloor[i][j].coordinates.x,
                    includedNodesOnFloor[i][j].coordinates.y,
                    5,
                    0,
                    2 * Math.PI,
                  );
                }
                ctx.fill();
              }
            }

            ctx.strokeStyle = "#0000FF";
            ctx.lineWidth = 7;
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

            ctx.strokeStyle = "white"; // Set the stroke color to black
            ctx.lineWidth = 4; // Set the border width
            ctx.beginPath();
            ctx.arc(currentX, currentY, 14, 0, 2 * Math.PI);
            ctx.stroke();


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
   */

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
      <Box sx={{display: "flex"}}>


        <CssBaseline/>
        <TopBanner2/>

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

      <Box
        width={window.innerWidth}
        height={window.innerHeight}
        overflow={"clip"}
      >
        <TransformWrapper>
          <TransformComponent>
            <Draggable>
              <>
                <BackgroundCanvas
                  style={{
                    position: "relative",
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  floor={floor}
                  renderStatusCallback={handleBackgroundRenderStatus}
                />
                <SymbolCanvas
                  style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
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
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
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
                />
                <FloorIconsCanvas
                  style={{
                    position: "absolute",
                    top: 50,
                    left: 0,
                    minHeight: "100vh",
                    maxHeight: "100%",
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
                />
                <canvas
                  ref={iconCanvasRef}
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
    </>
  );
}

export default MapRoute;
