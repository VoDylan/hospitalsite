import {Box, Divider, Drawer, Stack, Typography} from "@mui/material";
import NodeAutocomplete from "./NodeAutocomplete.tsx";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {SyntheticEvent} from "react";
import {AutocompleteNodeType} from "../../../common/types/AutocompleteNodeType.ts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NodeInfo from "../NodeInfo.tsx";
import EdgeInfo from "../EdgeInfo.tsx";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import useWindowSize from "../../../hooks/useWindowSize.tsx";
import FilterSlider from "./FilterSlider.tsx";
import {NodeTypes} from "common/src/map/MapNodeType.ts";
import {IFilterState} from "../../../hooks/useFilters.tsx";

interface MapEditorSideBar2Props {
  title: string;

  nodeData: MapNode[];

  filterInfo: Map<NodeTypes, IFilterState>;

  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  edgeBetweenNodes: MapEdge | null;

  nodeUpdateCallback: () => void;

  handleSelectNode1: (nodeID: string | null) => void;
  handleSelectNode2: (nodeID: string | null) => void;
  handleCreateEdge: (startNode1: MapNode, startNode2: MapNode) => void;
  handleDeleteEdge: (edge: MapEdge) => void;
  handleClearNode1: () => void;
  handleClearNode2: () => void;
  handleEditNode: (node: MapNode) => void;
  handleDeleteNode: (node: MapNode) => void;

  handleIconStateChange: (filterType: NodeTypes, newState: boolean) => void;
}

export default function MapEditorSideBar2(props: MapEditorSideBar2Props) {
  const [windowWidth, windowHeight] = useWindowSize();

  const handleNode1Change = (event: SyntheticEvent, value: AutocompleteNodeType | null) => {
    props.handleSelectNode1((value ? value.node : null));
  };

  const handleNode2Change = (event: SyntheticEvent, value: AutocompleteNodeType | null) => {
    props.handleSelectNode2((value ? value.node : null));
  };

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: "18%",
        height: "100%",
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          position: "relative",
          width: "100%",
          height: `${windowHeight - 120}px`,
        },
        elevation: 3,
      }}

    >
      <Box
        margin={"25px"}
        marginBottom={"50px"}
      >
        <Stack>
          <Typography
            color={"#003A96"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={30}
            sx={{ marginBottom: "10%", marginTop: "10%" }}
          >
            {props.title}
          </Typography>
          <Stack
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            <NodeAutocomplete
              style={{
                marginTop: "15px",
              }}
              label={"Node 1"}
              Icon={<RadioButtonCheckedIcon color={"primary"} sx={{color: "blue"}}/>}
              onChange={handleNode1Change}
              nodeData={props.nodeData}
              value={props.selectedNode1}
            />
            <MoreVertIcon fontSize={"medium"}/>
            <NodeAutocomplete
              style={{
                marginBottom: "15px",
              }}
              label={"Node 2"}
              Icon={<LocationOnIcon fontSize={"medium"} sx={{color: "red"}}/>}
              onChange={handleNode2Change}
              nodeData={props.nodeData}
              value={props.selectedNode2}
            />
          </Stack>
          <Divider
            variant={"middle"}
            orientation={"horizontal"}
            flexItem
            aria-hidden={"true"}
            sx={{
              borderBottom: "2px solid",
              opacity: "0.5",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          />
          {!props.selectedNode1 && !props.selectedNode2 ? (
            <></>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginBottom: "25px",
              }}
            >
              {props.selectedNode1 ? (
                <NodeInfo
                  style={{
                    opacity: "1",
                    marginTop: "20px",
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
            </Box>
          )}
          <Divider
            variant={"middle"}
            orientation={"horizontal"}
            flexItem
            aria-hidden={"true"}
            sx={{
              borderBottom: "2px solid",
              opacity: "0.5",
            }}
          />
          <FilterSlider
            filterInfo={props.filterInfo}
            handleIconStateChange={props.handleIconStateChange}
          />
        </Stack>
      </Box>
    </Drawer>
  );
}
