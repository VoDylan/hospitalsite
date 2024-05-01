import MapNode from "common/src/map/MapNode.ts";
import {useNodes} from "../hooks/useNodes.tsx";
import {useSelectedNodes} from "../hooks/useSelectedNodes.tsx";
import {useFilters} from "../hooks/useFilters.tsx";
import {useLegend} from "../hooks/useLegend.tsx";
import {useFloor} from "../hooks/useFloor.tsx";
import useWindowSize from "../hooks/useWindowSize.tsx";
import {useEffect, useState} from "react";
import GraphManager from "../common/GraphManager.ts";
import {Box, IconButton, Paper, Stack} from "@mui/material";
import MapSideBarNEW from "../components/map/MapSideBarNEW.tsx";
import MapToggleBar from "../components/map/MapToggleBar.tsx";
import Legend from "frontend/src/components/map/mapEditor/Legend.tsx";
import Floors from "../components/map/FloorTabs.tsx";
import MapRender from "../components/map/MapRender.tsx";
import {usePathfinding} from "../hooks/usePathfinding.tsx";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";
import NearMeIcon from "@mui/icons-material/NearMe";
import {useParams} from "react-router-dom";

export default function PathfindingPage() {
  const {startnode, endnode} = useParams();

  const {
    nodeData,
    dataLoadedHard,
    setDataLoadedHard,
    dataLoadedSoft,
    setDataLoadedSoft,
  } = useNodes();

  const {
    selectedNode1,
    selectedNode2,
    edgeBetween,
    setSelectedNode1,
    setSelectedNode2,
    selectNodeGeneral,
    deselectNodeGeneral,
  } = useSelectedNodes();

  const [
    filteredNodes,
    filtersApplied,
    filterInfo,
    setFiltersApplied,
    setNodeDataFilters,
    setNodeDataLoadedFilters,
    setNewFilterActiveStatus,
    selectAllFilters,
    selectNoFilters
  ] = useFilters(false);

  const [
    pathNodesData,
    setPathNodesData,
    pathRendered,
    setPathRendered,
    nodesToNextFloor,
    setNodesToNextFloor,
    nodesToPrevFloor,
    setNodesToPrevFloor,
    algorithm,
    setAlgorithm,
  ] = usePathfinding();

  const [
    isOpen,
    setIsOpen
  ] = useLegend();

  const [
    floor,
    setFloor
  ] = useFloor();

  const [, windowHeight] = useWindowSize();
  const [updateSelection, setUpdateSelection] = useState<boolean>(false);
  const [resetZoom, setResetZoom] = useState<boolean>(false);
  const [resetPath, setResetPath] = useState<boolean>(false);

  const [generateInitPathSignal, setGenerateInitPathSignal] = useState<boolean>(false);
  const [hasGeneratedInitPath, setHasGeneratedInitPath] = useState<boolean>(false);

  const handleInterFloorNodesUpdate = (
    nodesToNextFloor: Map<TypeCoordinates, Floor>,
    nodesToPrevFloor: Map<TypeCoordinates, Floor>,) => {
    setNodesToNextFloor(nodesToNextFloor);
    setNodesToPrevFloor(nodesToPrevFloor);
  };

  useEffect(() => {
    if(dataLoadedHard) {
      if(selectedNode1) setSelectedNode1(GraphManager.getInstance().getNodeByID(selectedNode1.nodeID));
      if(selectedNode2) setSelectedNode2(GraphManager.getInstance().getNodeByID(selectedNode2.nodeID));
    }
  }, [dataLoadedHard, selectedNode1, selectedNode2, setSelectedNode1, setSelectedNode2]);

  useEffect(() => {
    setNodeDataLoadedFilters(dataLoadedSoft);
    setFiltersApplied(false);
  }, [dataLoadedSoft, setFiltersApplied, setNodeDataLoadedFilters]);

  useEffect(() => {
    setUpdateSelection(filtersApplied);
  }, [filtersApplied]);

  useEffect(() => {
    if(updateSelection) {
      if(selectedNode1 && !filteredNodes.find((value: MapNode) => {
        return value == selectedNode1;
      }))
        setSelectedNode1(null);
      if(selectedNode2 && !filteredNodes.find((value: MapNode) => {
        return value == selectedNode2;
      }))
        setSelectedNode2(null);

      setUpdateSelection(false);
    }
  }, [filteredNodes, selectedNode1, selectedNode2, setSelectedNode1, setSelectedNode2, updateSelection]);

  useEffect(() => {
    setNodeDataFilters(nodeData);
  }, [nodeData, setNodeDataFilters]);

  useEffect(() => {
    if(pathNodesData.length == 0) setPathRendered(false);
    else setPathRendered(true);
  }, [pathNodesData, setPathRendered]);

  useEffect(() => {
    setPathNodesData([]);
    setPathRendered(false);
    setNodesToNextFloor(new Map<TypeCoordinates, Floor>());
    setNodesToPrevFloor(new Map<TypeCoordinates, Floor>());
  }, [setPathNodesData, setPathRendered, selectedNode1, selectedNode2, algorithm, resetPath, setNodesToNextFloor, setNodesToPrevFloor]);

  useEffect(() => {
    if(filtersApplied && startnode && endnode && !hasGeneratedInitPath) {
      setSelectedNode1(GraphManager.getInstance().getNodeByID(startnode));
      setSelectedNode2(GraphManager.getInstance().getNodeByID(endnode));
      setGenerateInitPathSignal(true);
    }
  }, [endnode, filtersApplied, hasGeneratedInitPath, setSelectedNode1, setSelectedNode2, startnode]);

  return (
    <>
      <Box
        position={"absolute"}
        top={"120px"}
        width={"100%"}
        height={`${windowHeight - 120}px`}
      >
        <Stack
          direction={"row"}
          height={"100%"}
        >
          <MapSideBarNEW
            title={"Pathfinding"}

            setPathNodesData={(newPathNodesData: TypeCoordinates[]) => setPathNodesData(newPathNodesData)}
            setFloor={setFloor}
            pathRendered={pathRendered}

            setAlgorithmCallback={setAlgorithm}

            generateInitPathSignal={generateInitPathSignal}
            hasGeneratedInitPath={hasGeneratedInitPath}
            setHasGeneratedInitPath={setHasGeneratedInitPath}

            filterInfo={filterInfo}
            selectedNode1={selectedNode1}
            selectedNode2={selectedNode2}
            edgeBetweenNodes={edgeBetween}
            nodeData={filteredNodes}
            nodeUpdateCallback={() => setDataLoadedSoft(false)}
            clearPathCallback={() => setResetPath((old: boolean) => {
              return !old;
            })}
            handleSelectNode1={(nodeID) => setSelectedNode1(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleSelectNode2={(nodeID) => setSelectedNode2(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleClearNode1={() => setSelectedNode1(null)}
            handleClearNode2={() => setSelectedNode2(null)}

            handleIconStateChange={(filterType, newState) => {
              setNewFilterActiveStatus({type: filterType, active: newState});
            }}

            handleSelectAllFilters={() => selectAllFilters(true)}
            handleSelectNoFilters={() => selectNoFilters(true)}
          />
          <Box
            width={"100%"}
            height={"100%"}
            position={"relative"}
          >
            <Paper
              style={{
                position: "absolute",
                right: 0,
                width: "200px",
                margin: "25px",
                zIndex: 2,
              }}
              elevation={3}
            >
              <>
                {/* Toggle button */}
                <MapToggleBar onClick={() => setIsOpen(!isOpen)} buttonText={isOpen ? "Hide Legend" : "Show Legend"} />
                {isOpen && (
                  <Legend filterInfo={[...filterInfo.values()]}/>
                )}
              </>
            </Paper>
            <Floors
              setFloor={setFloor}
              activeFloor={floor}
            />
            <IconButton
              onClick={() => {
                if(selectedNode1) {
                  setFloor(selectedNode1.floor as Floor);
                  setResetZoom((old: boolean) => {
                    return !old;
                  });
                }
                else return;
              }}
              aria-label="start"
              sx={{
                color: "#186BD9",
                backgroundColor: "white",
                border: "1px solid #186BD9",
                "&:hover": {
                 backgroundColor: "white"},
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: "15px",
                zIndex: 100,
              }}>
              <NearMeIcon />
            </IconButton>
            <MapRender
              filterInfo={filterInfo}
              floor={floor}
              setFloorCallback={setFloor}
              filteredNodes={filteredNodes}

              resetZoom={resetZoom}

              pathNodesData={pathNodesData}
              nodesToNextFloor={nodesToNextFloor}
              nodesToPrevFloor={nodesToPrevFloor}

              selectNodeGeneral={selectNodeGeneral}
              deselectNodeGeneral={deselectNodeGeneral}
              selectedNode1={selectedNode1}
              selectedNode2={selectedNode2}
              dataLoadedHard={dataLoadedHard}
              setDataLoadedHard={setDataLoadedHard}
              dataLoadedSoft={dataLoadedSoft}
              setDataLoadedSoft={setDataLoadedSoft}

              handleInterFloorNodesUpdate={handleInterFloorNodesUpdate}
              setPathRenderStatus={setPathRendered}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
