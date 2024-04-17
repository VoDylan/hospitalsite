import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import TopBanner2 from "../components/banner/TopBanner.tsx";
import "./map.css";
import {MapNodeType} from "common/src/map/MapNodeType.ts";
import GraphManager from "../common/GraphManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import Legend from "../components/map/Legend.tsx";

import FilterManager, {generateFilterValue,} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import NodeFilter from "common/src/filter/filters/Filter.ts";
import Draggable from "react-draggable";
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import Icon from "../components/map/SlideIcon.tsx";
import BackgroundCanvas from "../components/map/BackgroundCanvas.tsx";
import {Floor, floorStrToObj} from "common/src/map/Floor.ts";
import SymbolCanvas from "../components/map/SymbolCanvas.tsx";
import startIcon from "../images/mapImages/starticon3.png";
import endIcon from "../images/mapImages/endIcon.png";
import IconCanvas from "../components/map/IconCanvas.tsx";
import MapEditorSideBar from "../components/map/MapEditorSideBar.tsx";
import EdgeCanvas from "../components/map/EdgeCanvas.tsx";
import ClickableCanvas from "../components/map/ClickableCanvas.tsx";


interface TransformState {
  scale: number;
  positionX: number;
  positionY: number
}

function MapEditingPage() {
  const iconCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const transformState = useRef<TransformState>({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [selectedNode1, setSelectedNode1] = useState<MapNode | null>(null);
  const [selectedNode2, setSelectedNode2] = useState<MapNode | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  const [backgroundRenderStatus, setBackgroundRenderStatus] = useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const [floor, setFloor] = useState<Floor>(Floor.L1);

  /**
   * Pathfinder selection
   */
  const [open] = React.useState(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

  //-----------------------------------------------------------------------------------------

  /**
   * DATA LOADING
   */

  const loadNodeData = async (): Promise<MapNodeType[]> => {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes"))
      .data as MapNodeType[];

    GraphManager.getInstance().resetData();

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
        setSelectedNode1(GraphManager.getInstance().getNodeByID(selectedNode.node)!);
      }
    } else {
      setSelectedNode1(null); // Handle null value if necessary
    }
  };

  const handleEndNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setSelectedNode2(GraphManager.getInstance().getNodeByID(selectedNode.node)!);
      }
    } else {
      setSelectedNode2(null); // Handle null value if necessary
    }
  };

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
      setFiltersApplied(false);
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

  const handleIconCallback = (ref: HTMLCanvasElement) => {
    iconCanvasRef.current = ref;
  };

  const handleTransform = (ref: ReactZoomPanPinchRef, state: { scale: number; positionX: number; positionY: number }) => {
    if(!transformRef.current) transformRef.current = ref;
    transformState.current = state;
  };

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!iconCanvasRef.current) return;
    const rect = iconCanvasRef.current.getBoundingClientRect();

    const leftOverHeight = (window.innerHeight - 120)/ (rect.height / transformState.current.scale);
    console.log(leftOverHeight);

    const widthRatio = canvasWidth / (window.innerWidth - (window.innerWidth * 0.18));
    const heightRatio = canvasHeight / (window.innerHeight - 120);

    const actualX = ((event.clientX - transformState.current.positionX - (window.innerWidth * 0.18)) / transformState.current.scale) * widthRatio;
    const actualY = ((event.clientY - transformState.current.positionY - 120) / transformState.current.scale) * heightRatio * leftOverHeight;
    console.log(`Adjusted ${actualX} ${actualY}`);

    for (let i = 0; i < filteredNodes.length; i++){
      if (filteredNodes[i].floor === floor){
        const node = filteredNodes[i];
        const distance = Math.sqrt((actualX - node.xcoord)**2 + (actualY - node.ycoord)**2);

        if (distance < 25){
          if(selectedNode1 && selectedNode2) {
            setSelectedNode1(filteredNodes[i]);
            setSelectedNode2(null);
            return;
          } else if(selectedNode1) {
            setSelectedNode2(filteredNodes[i]);
            console.log("Set node 2");
            return;
          } else {
            setSelectedNode1(filteredNodes[i]);
            console.log("Set node 1");
            return;
          }
        }
      }
    }
  };

  const handleClearNode1 = () => {
    setSelectedNode1(null);
  };

  const handleClearNode2 = () => {
    setSelectedNode2(null);
  };

  const handleEditNode = (node: MapNode) => {
    try {
      axios.put("/api/database/nodes/updatenode", node.nodeInfo, {
        headers: {"Content-Type": "application/json"},
      }).then((res) => {
        console.log("Updated node!");
        console.log(res.data);
      });
    } catch (e) {
      console.log("Failed to update node");
    }
    setNodeDataLoaded(false);
  };

  const handleDeleteNode = (node: MapNode) => {
    try {
      axios.put(`/api/database/nodes/deletenode/${node.nodeID}`, {}, {
        headers: {"Content-Type": "application/json"},
      }).then((res) => {
        console.log("Deleted node!");
        console.log(res.data);
      });
    } catch (e) {
      console.log("Failed to delete node");
    }
    setNodeDataLoaded(false);
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
          <Box
            sx={{
              width: "18%",
              minWidth: "18%",
              minHeight: 0,
            }}
          >
            {/*Side Bar*/}
            <MapEditorSideBar
              title="Map Editing"
              onChange={(event, value) => handleStartNodeChange(value)}
              autocompleteNodeData={autocompleteNodeData}
              compareFn={(a, b) => a.label.localeCompare(b.label)}
              nodeToLabelIdCallback={(node) => node.label}
              groupBy={(option) => option.charAt(0).toUpperCase()}
              optionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="First Node Location" value={selectedNode1 ? selectedNode1.nodeID : ""}/>
              )}
              onChange1={(event, value) => handleEndNodeChange(value)}
              renderInput1={(params) => (
                <TextField {...params} label="Second Node Location" value={selectedNode2 ? selectedNode2.nodeID : ""}/>
              )}
              open={open}
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
              selectedNode1={selectedNode1}
              selectedNode2={selectedNode2}
              handleClearNode1={handleClearNode1}
              handleClearNode2={handleClearNode2}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
            />
          </Box>

          <Box
            height={"100%"}
            overflow={"clip"}
          >
            <TransformWrapper
              onTransformed={handleTransform}
              minScale={0.8}
              initialScale={1.0}
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
                    <EdgeCanvas
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
                      floor={floor}
                      nodeDataLoaded={nodeDataLoaded}
                    />
                    <SymbolCanvas
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
                      filtersApplied={filtersApplied}
                      filteredNodes={filteredNodes}
                      floor={floor}
                    />
                    <IconCanvas
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
                      refCallback={handleIconCallback}
                    />
                    <ClickableCanvas
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                      }}
                      backgroundRendered={backgroundRenderStatus}
                      width={canvasWidth}
                      height={canvasHeight}
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

export default MapEditingPage;
