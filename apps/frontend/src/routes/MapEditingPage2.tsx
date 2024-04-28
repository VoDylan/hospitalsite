import {useNodes} from "../hooks/useNodes.tsx";
import {useEffect, useState} from "react";
import {Box, Paper, Stack} from "@mui/material";
import useWindowSize from "../hooks/useWindowSize.tsx";
import MapRender from "../components/map/mapEditor2/MapRender.tsx";
import MapEditorSideBar2 from "../components/map/mapEditor2/MapEditorSideBar2.tsx";
import {useSelectedNodes} from "../hooks/useSelectedNodes.tsx";
import GraphManager from "../common/GraphManager.ts";
import {useFilters} from "../hooks/useFilters.tsx";
import MapNode from "common/src/map/MapNode.ts";
import ToggleButton from "../components/map/MapToggleBar.tsx";
import Legend from "../components/map/mapEditor2/Legend.tsx";
import {useLegend} from "../hooks/useLegend.tsx";
import Floors from "../components/map/FloorTabs.tsx";
import {useFloor} from "../hooks/useFloor.tsx";

export default function MapEditingPage2() {
  const {
    nodeData,
    edgeData,
    dataLoaded,
    setDataLoaded
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
  ] = useFilters(true);

  const [
    isOpen,
    setIsOpen
  ] = useLegend();

  const [
    floor,
    setFloor
  ] = useFloor();

  const [windowWidth, windowHeight] = useWindowSize();
  const [updateSelection, setUpdateSelection] = useState<boolean>(false);

  useEffect(() => {
    if(dataLoaded) {
      if(selectedNode1) setSelectedNode1(GraphManager.getInstance().getNodeByID(selectedNode1.nodeID));
      if(selectedNode2) setSelectedNode2(GraphManager.getInstance().getNodeByID(selectedNode2.nodeID));
    }
  }, [dataLoaded, selectedNode1, selectedNode2, setSelectedNode1, setSelectedNode2]);

  useEffect(() => {
    setNodeDataLoadedFilters(dataLoaded);
    setFiltersApplied(false);
  }, [dataLoaded, setFiltersApplied, setNodeDataLoadedFilters]);

  useEffect(() => {
    console.log("Filtered Nodes");
    console.log(filteredNodes);
  }, [filteredNodes]);

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
          <MapEditorSideBar2
            title={"Map Editor"}
            filterInfo={filterInfo}
            selectedNode1={selectedNode1}
            selectedNode2={selectedNode2}
            edgeBetweenNodes={edgeBetween}
            nodeData={filteredNodes}
            nodeUpdateCallback={() => setDataLoaded(false)}
            handleSelectNode1={(nodeID) => setSelectedNode1(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleSelectNode2={(nodeID) => setSelectedNode2(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleClearNode1={() => setSelectedNode1(null)}
            handleClearNode2={() => setSelectedNode2(null)}
            handleCreateEdge={() => setDataLoaded(false)}
            handleDeleteEdge={() => setDataLoaded(false)}
            handleDeleteNode={() => setDataLoaded(false)}
            handleEditNode={() => setDataLoaded(false)}

            handleIconStateChange={(filterType, newState) => {
              setNewFilterActiveStatus({type: filterType, active: newState});
            }}

            handleSelectAllFilters={() => selectAllFilters(true)}
            handleSelectNoFilters={() => selectNoFilters(true)}
          />
          <Box
            width={"100%"}
            height={"100%"}
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
                <ToggleButton onClick={() => setIsOpen(!isOpen)} buttonText={isOpen ? "Hide Legend" : "Show Legend"} />
                {isOpen && (
                  <Legend filterInfo={[...filterInfo.values()]}/>
                )}
              </>
            </Paper>
            <Floors setFloor={setFloor} />
            <MapRender
              filterInfo={filterInfo}
              floor={floor}
              filteredNodes={filteredNodes}
              selectNodeGeneral={selectNodeGeneral}
              deselectNodeGeneral={deselectNodeGeneral}
              selectedNode1={selectedNode1}
              selectedNode2={selectedNode2}
              dataLoaded={dataLoaded}
              setDataLoaded={setDataLoaded}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
