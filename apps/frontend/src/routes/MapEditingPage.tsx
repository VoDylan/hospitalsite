import {useNodes} from "frontend/src/hooks/useNodes.tsx";
import {useEffect, useState} from "react";
import {Box, Paper, Stack} from "@mui/material";
import useWindowSize from "frontend/src/hooks/useWindowSize.tsx";
import MapRender from "frontend/src/components/map/MapRender.tsx";
import MapSideBar from "frontend/src/components/map/MapSideBar.tsx";
import {useSelectedNodes} from "frontend/src/hooks/useSelectedNodes.tsx";
import GraphManager from "frontend/src/common/GraphManager.ts";
import {useFilters} from "frontend/src/hooks/useFilters.tsx";
import MapNode from "common/src/map/MapNode.ts";
import MapToggleBar from "frontend/src/components/map/MapToggleBar.tsx";
import Legend from "frontend/src/components/map/mapEditor/Legend.tsx";
import {useLegend} from "frontend/src/hooks/useLegend.tsx";
import Floors from "frontend/src/components/map/FloorTabs.tsx";
import {useFloor} from "frontend/src/hooks/useFloor.tsx";

export default function MapEditingPage() {
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
  ] = useFilters(true);

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
          <MapSideBar
            title={"Map Editor"}

            enableEditorTools

            filterInfo={filterInfo}
            selectedNode1={selectedNode1}
            selectedNode2={selectedNode2}
            edgeBetweenNodes={edgeBetween}
            nodeData={filteredNodes}
            nodeUpdateCallback={() => setDataLoadedSoft(false)}
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
            <MapRender
              enableEditorTools
              filterInfo={filterInfo}
              floor={floor}
              filteredNodes={filteredNodes}
              selectNodeGeneral={selectNodeGeneral}
              deselectNodeGeneral={deselectNodeGeneral}
              selectedNode1={selectedNode1}
              selectedNode2={selectedNode2}
              dataLoadedHard={dataLoadedHard}
              setDataLoadedHard={setDataLoadedHard}
              dataLoadedSoft={dataLoadedSoft}
              setDataLoadedSoft={setDataLoadedSoft}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
