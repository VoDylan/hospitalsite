import {Box, Divider, Drawer, Stack, Typography} from "@mui/material";
import NodeAutocomplete from "frontend/src/components/map/NodeAutocomplete.tsx";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import React, {SyntheticEvent} from "react";
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
import PathfindingInfo from "./PathfindingInfo.tsx";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";
import {PathAlgorithmType} from "../../common/types/PathAlgorithmType.ts";
import Spacer from "../general/Spacer.tsx";

interface MapEditorSideBar2Props {
  title: string;
  enableEditorTools?: boolean;

  setPathNodesData?: (newPathNodesData: TypeCoordinates[]) => void;
  setFloor?: (newFloor: Floor) => void;

  setAlgorithmCallback?: (algorithm: PathAlgorithmType) => void;

  nodeData: MapNode[];

  filterInfo: Map<FilterType, IFilterState>;

  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  edgeBetweenNodes?: MapEdge | null;

  autoGeneratePath?: boolean;
  hasGeneratedPathCallback?: () => void;

  nodeUpdateCallback?: () => void;
  clearPathCallback?: () => void;
  pathRendered?: boolean;

  handleSelectNode1: (nodeID: string | null) => void;
  handleSelectNode2: (nodeID: string | null) => void;
  handleClearNode1: () => void;
  handleClearNode2: () => void;

  handleIconStateChange: (filterType: FilterType, newState: boolean) => void;

  handleSelectAllFilters: () => void;
  handleSelectNoFilters: () => void;
}

export default function MapSideBarNEW(props: MapEditorSideBar2Props) {
  const [, windowHeight] = useWindowSize();

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
        margin={"15px"}
        marginTop={"35px"}
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
          <Spacer spaceLength={"35px"}/>
          <Stack
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
            }}
          >
            <NodeAutocomplete
              label={"Node 1"}
              Icon={<RadioButtonCheckedIcon color={"primary"} sx={{color: "blue"}}/>}
              onChange={handleNode1Change}
              nodeData={props.nodeData}
              value={props.selectedNode1}
            />
            <MoreVertIcon
              fontSize={"medium"}
              sx={{
                marginLeft: "5%",
              }}
            />
            <NodeAutocomplete
              label={"Node 2"}
              Icon={<LocationOnIcon fontSize={"medium"} sx={{color: "red"}}/>}
              onChange={handleNode2Change}
              nodeData={props.nodeData}
              value={props.selectedNode2}
            />
          </Stack>
          <Spacer spaceLength={"25px"}/>
          {props.enableEditorTools ?
            (
              <>
                <SelectedNodeInfo
                  selectedNode1={props.selectedNode1}
                  selectedNode2={props.selectedNode2}
                  edgeBetweenNodes={props.edgeBetweenNodes!}
                  nodeUpdateCallback={props.nodeUpdateCallback!}
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
              </>
            ) : (
              <>
                <PathfindingInfo
                  startNode={props.selectedNode1}
                  endNode={props.selectedNode2}
                  pathRendered={props.pathRendered!}
                  setPathNodesDataCallback={props.setPathNodesData!}
                  setFloor={props.setFloor!}
                  autoGeneratePath={props.autoGeneratePath!}
                  hasGeneratedPathCallback={props.hasGeneratedPathCallback!}
                  setAlgorithmCallback={props.setAlgorithmCallback!}
                  clearPathCallback={props.clearPathCallback!}
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
              </>
            )
          }
          <FilterSlider
            filterInfo={props.filterInfo}
            handleIconStateChange={props.handleIconStateChange}
            handleSelectAllFilters={props.handleSelectAllFilters}
            handleSelectNofilters={props.handleSelectNoFilters}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "75%",
            }}
          />
        </Stack>
      </Box>
    </Drawer>
  );
}
