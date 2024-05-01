import {Box, Divider} from "@mui/material";
import NodeInfo from "./NodeInfo.tsx";
import EdgeInfo from "./EdgeInfo.tsx";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";

interface SelectedNodeInfoProps {
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  edgeBetweenNodes: MapEdge | null;

  nodeUpdateCallback: () => void;

  handleClearNode1: () => void;
  handleClearNode2: () => void;
}

export default function SelectedNodeInfo(props: SelectedNodeInfoProps) {
  return (
    !props.selectedNode1 && !props.selectedNode2 ? (
      <></>
    ) : (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {props.selectedNode1 ? (
          <NodeInfo
            style={{
              opacity: "1",
            }}
            title={"Node 1"}
            node={props.selectedNode1}
            textColor={"#535353"}
            clearNodeCallback={props.handleClearNode1}
            nodeUpdateCallback={props.nodeUpdateCallback}
          />
        ) : (
          <></>
        )}
        {props.selectedNode2 ? (
          <NodeInfo
            style={{
              opacity: "1",
              marginTop: "20px",
            }}
            title={"Node 2"}
            node={props.selectedNode2}
            textColor={"#535353"}
            clearNodeCallback={props.handleClearNode2}
            nodeUpdateCallback={props.nodeUpdateCallback}
          />
        ) : (
          <></>
        )}
        {props.selectedNode1 && props.selectedNode2 ? (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <EdgeInfo
              style={{
                opacity: "1",
                marginTop: "20px",
                width: "100%",
                overflow: "clip",
              }}
              edge={props.edgeBetweenNodes}
              selectedNode1={props.selectedNode1}
              selectedNode2={props.selectedNode2}
              textColor={"#535353"}
              nodeUpdateCallback={props.nodeUpdateCallback}
            />
          </Box>
        ) : (
          <></>
        )}
        <Divider
          variant={"middle"}
          orientation={"horizontal"}
          flexItem
          aria-hidden={"true"}
          sx={{
            borderBottom: "2px solid",
            opacity: "0.5",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        />
      </Box>
    )
  );
}
