import {useNodes} from "../hooks/useNodes.tsx";
import {useEffect} from "react";
import {Box, Stack} from "@mui/material";
import useWindowSize from "../hooks/useWindowSize.tsx";
import MapRender from "../components/map/mapEditor2/MapRender.tsx";
import MapEditorSideBar2 from "../components/map/mapEditor2/MapEditorSideBar2.tsx";
import {useSelectedNodes} from "../hooks/useSelectedNodes.tsx";
import GraphManager from "../common/GraphManager.ts";
import {useFilters} from "../hooks/useFilters.tsx";

export default function MapEditingPage2() {
  const {
    nodeData,
    edgeData,
    nodeDataLoaded,
    setNodeDataLoaded
  } = useNodes();

  const {
    selectedNode1,
    selectedNode2,
    edgeBetween,
    setSelectedNode1,
    setSelectedNode2
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
  ] = useFilters();

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    if(nodeDataLoaded) {
      if(selectedNode1) setSelectedNode1(GraphManager.getInstance().getNodeByID(selectedNode1.nodeID));
      if(selectedNode2) setSelectedNode2(GraphManager.getInstance().getNodeByID(selectedNode2.nodeID));
    }
  }, [nodeDataLoaded, selectedNode1, selectedNode2, setSelectedNode1, setSelectedNode2]);

  useEffect(() => {
    setNodeDataLoadedFilters(nodeDataLoaded);
  }, [nodeDataLoaded, setNodeDataLoadedFilters]);

  useEffect(() => {
    console.log("Filtered Nodes");
    console.log(filteredNodes);
  }, [filteredNodes]);

  useEffect(() => {
    console.log(`filtersApplied changed: ${filtersApplied}`);
  }, [filtersApplied]);

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
            nodeUpdateCallback={() => setNodeDataLoaded(false)}
            handleSelectNode1={(nodeID) => setSelectedNode1(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleSelectNode2={(nodeID) => setSelectedNode2(nodeID ? GraphManager.getInstance().getNodeByID(nodeID) : null)}
            handleClearNode1={() => setSelectedNode1(null)}
            handleClearNode2={() => setSelectedNode2(null)}
            handleCreateEdge={() => {return;}}
            handleDeleteEdge={() => {return;}}
            handleDeleteNode={() => {return;}}
            handleEditNode={() => {return;}}

            handleIconStateChange={(filterType, newState) => {
              setNewFilterActiveStatus({type: filterType, active: newState});
            }}
          />
          <MapRender/>
        </Stack>
      </Box>
    </>
  );
}
