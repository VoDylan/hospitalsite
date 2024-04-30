import {Box, Divider, Drawer, Stack, Typography} from "@mui/material";
import NodeAutocomplete from "frontend/src/components/map/NodeAutocomplete.tsx";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {SyntheticEvent} from "react";
import {AutocompleteNodeType} from "frontend/src/common/types/AutocompleteNodeType.ts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import useWindowSize from "frontend/src/hooks/useWindowSize.tsx";
import FilterSlider from "frontend/src/components/map/filter/FilterSlider.tsx";
import {IFilterState} from "frontend/src/hooks/useFilters.tsx";
import {FilterType} from "frontend/src/common/types/FilterType.ts";
import ChangeLogComponent from "frontend/src/components/map/mapEditor/ChangeLogComponent.tsx";
import SelectedNodeInfo from "./mapEditor/SelectedNodeInfo.tsx";

interface MapEditorSideBar2Props {
  title: string;

  nodeData: MapNode[];

  filterInfo: Map<FilterType, IFilterState>;

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

  handleIconStateChange: (filterType: FilterType, newState: boolean) => void;

  handleSelectAllFilters: () => void;
  handleSelectNoFilters: () => void;
}

export default function MapEditorSideBar(props: MapEditorSideBar2Props) {
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
          >
            {props.title}
          </Typography>
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
          <Stack
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            <NodeAutocomplete
              label={"Node 1"}
              Icon={<RadioButtonCheckedIcon color={"primary"} sx={{color: "blue"}}/>}
              onChange={handleNode1Change}
              nodeData={props.nodeData}
              value={props.selectedNode1}
            />
            <MoreVertIcon fontSize={"medium"}/>
            <NodeAutocomplete
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
              marginTop: "25px",
              marginBottom: "25px",
            }}
          />
          <SelectedNodeInfo
            selectedNode1={props.selectedNode1}
            selectedNode2={props.selectedNode2}
            edgeBetweenNodes={props.edgeBetweenNodes}
            nodeUpdateCallback={props.nodeUpdateCallback}
            handleClearNode1={props.handleClearNode1}
            handleClearNode2={props.handleClearNode1}
          />
          <ChangeLogComponent
            sx={{
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
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
          <FilterSlider
            filterInfo={props.filterInfo}
            handleIconStateChange={props.handleIconStateChange}
            handleSelectAllFilters={props.handleSelectAllFilters}
            handleSelectNofilters={props.handleSelectNoFilters}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Stack>
      </Box>
    </Drawer>
  );
}
