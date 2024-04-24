import {useNodes} from "../hooks/useNodes.tsx";
import {useEffect} from "react";
import {Box, Stack} from "@mui/material";
import useWindowSize from "../hooks/useWindowSize.tsx";
import MapRender from "../components/map/mapEditor2/MapRender.tsx";
import MapEditorSideBar2 from "../components/map/mapEditor2/MapEditorSideBar2.tsx";

export default function MapEditorPage2() {

  const {
    nodeData,
    edgeData,
    nodeDataLoaded,
    setNodeDataLoaded
  } = useNodes();

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    console.log(nodeData);
  }, [nodeData]);

  useEffect(() => {
    console.log(edgeData);
  }, [edgeData]);

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

          />
          <MapRender/>
        </Stack>
      </Box>
    </>
  );
}
