import {
  ReactZoomPanPinchContentRef,
  ReactZoomPanPinchRef, ReactZoomPanPinchState,
  TransformComponent,
  TransformWrapper
} from "react-zoom-pan-pinch";
import React, {useEffect, useRef, useState} from "react";
import {IFilterState} from "frontend/src/hooks/useFilters.tsx";
import BackgroundCanvas from "frontend/src/components/map/BackgroundCanvas.tsx";
import {useCanvasInfo} from "frontend/src/hooks/useCanvasInfo.tsx";
import {Floor} from "common/src/map/Floor.ts";
import EdgeCanvas from "frontend/src/components/map/EdgeCanvas.tsx";
import MapNode from "common/src/map/MapNode.ts";
import {FilterType} from "frontend/src/common/types/FilterType.ts";
import SymbolCanvas from "frontend/src/components/map/mapEditor/SymbolCanvas.tsx";
import {useNodeCreationInfo} from "frontend/src/hooks/useNodeCreationInfo.tsx";
import NodeCreator from "frontend/src/components/map/NodeCreator.tsx";
import useWindowSize from "frontend/src/hooks/useWindowSize.tsx";
import transformCoords2 from "frontend/src/common/TransformCoords2.ts";
import {Box} from "@mui/material";
import {isEqual} from "lodash";
import PathCanvas from "./map2/PathCanvas.tsx";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

interface MapRenderProps {
  enableEditorTools?: boolean

  filterInfo: Map<FilterType, IFilterState>;
  floor: Floor;
  filteredNodes: MapNode[];

  pathNodesData?: TypeCoordinates[];

  selectNodeGeneral: (node: MapNode) => void;
  deselectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  dataLoadedHard: boolean;
  setDataLoadedHard: React.Dispatch<React.SetStateAction<boolean>>;
  dataLoadedSoft: boolean;
  setDataLoadedSoft: React.Dispatch<React.SetStateAction<boolean>>;

  handleInterFloorNodesUpdate?: (
    nodesToNextFloor: Map<TypeCoordinates, Floor>,
    nodesToPrevFloor: Map<TypeCoordinates, Floor>,
  ) => void;
  setPathRenderStatus?: (status: boolean) => void;
}

export default function MapRender(props: MapRenderProps) {
  const [transformState, setTransformState] = useState<ReactZoomPanPinchState>({
    previousScale: 1,
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [nodeCreationInfo, setNodeCreationInfo] = useNodeCreationInfo();
  const [windowWidth, windowHeight] = useWindowSize();

  const [filterInfo, setFilterInfo] = useState<Map<FilterType, IFilterState>>(props.filterInfo);
  const [floor, setFloor] = useState<Floor>(props.floor);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>(props.filteredNodes);
  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[] | undefined>(props.pathNodesData);

  const transformWrapperRef = useRef<ReactZoomPanPinchContentRef>(null);

  const [
    backgroundRendered,
    setBackgroundRendered,
    canvasWidth,
    setCanvasWidth,
    canvasHeight,
    setCanvasHeight
  ] = useCanvasInfo();

  // const handleTransform = (
  //   ref: ReactZoomPanPinchRef,
  //   state: { scale: number; positionX: number; positionY: number },
  // ) => {
  //   if (!transformRef.current) transformRef.current = ref;
  //   transformState.current = state;
  // };

  const updateTransformState = (ref: ReactZoomPanPinchRef) => {
    // console.log("Updating transform state");
    // console.log(ref.state);

    const newState: ReactZoomPanPinchState = {
      previousScale: ref.state.previousScale,
      scale: ref.state.scale,
      positionX: ref.state.positionX,
      positionY: ref.state.positionY,
    };

    if(!isEqual(newState, transformState)) {
      console.log("MapRender: Updating transform state");
      setTransformState(newState);
    }
  };

  const handleBackgroundRenderStatus = (backgroundRendered: boolean, width: number, height: number) => {
    setBackgroundRendered(backgroundRendered);
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  const handleNodeCreationRequest = (event: React.MouseEvent, contentRef: React.MutableRefObject<HTMLDivElement | null>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();

    const {actualX, actualY} = transformCoords2(
      event.clientX,
      event.clientY,
      transformState,
      contentRef.current.clientWidth,
      contentRef.current.clientHeight,
      windowWidth,
      windowHeight,
      rect
    );

    console.log(`Double click registered: ${actualX}, ${actualY}`);

    setNodeCreationInfo({
      creatingNode: true,
      mouseXCoord: event.clientX,
      mouseYCoord: event.clientY,
      canvasXCoord: actualX,
      canvasYCoord: actualY,
    });
  };

  const handleCloseNodeCreator = () => {
    setNodeCreationInfo({
      creatingNode: false,
      mouseXCoord: 0,
      mouseYCoord: 0,
      canvasXCoord: 0,
      canvasYCoord: 0,
    });
  };
  const handleCreateNode = () => {
    handleCloseNodeCreator();
    props.setDataLoadedHard(false);
  };

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  useEffect(() => {
    setFloor(props.floor);
    if(transformWrapperRef.current) {
      transformWrapperRef.current.resetTransform();
    }
  }, [props.floor]);

  useEffect(() => {
    setFilteredNodes(props.filteredNodes);
  }, [props.filteredNodes]);

  useEffect(() => {
    setPathNodesData(props.pathNodesData);
  }, [props.pathNodesData]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
    >
      <TransformWrapper
        // onTransformed={handleTransform}
        onZoomStop={updateTransformState}
        onPanningStop={updateTransformState}
        onPinchingStop={updateTransformState}
        minScale={0.2}
        initialScale={0.2}
        doubleClick={{disabled: true}}
        ref={transformWrapperRef}
        centerOnInit
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
          contentStyle={{
            width: canvasWidth,
            height: canvasHeight,
            position: "absolute",
          }}
        >
          <>
            <BackgroundCanvas
              style={{
                position: "absolute",
                maxWidth: "100%",
              }}
              floor={floor}
              renderStatusCallback={handleBackgroundRenderStatus}
            />
            {props.enableEditorTools ?
              <EdgeCanvas
                style={{
                  position: "absolute",
                  maxWidth: "100%",
                }}
                backgroundRendered={backgroundRendered}
                width={canvasWidth}
                height={canvasHeight}
                floor={floor}
                nodeData={filteredNodes}
                dataLoaded={props.dataLoadedHard}
              /> :
              <PathCanvas
                style={{
                  position: "absolute",
                  maxWidth: "100%",
                }}
                backgroundRendered={backgroundRendered}
                width={canvasWidth}
                height={canvasHeight}
                floor={floor}
                pathNodesData={pathNodesData!}
                handleInterFloorNodesUpdate={props.handleInterFloorNodesUpdate!}
                setPathRenderStatus={props.setPathRenderStatus!}
                // startNode={props.selectedNode1}
                // endNode={props.selectedNode2}
              />
            }
            <SymbolCanvas
              enableEditorTools={props.enableEditorTools}
              backgroundRendered={backgroundRendered}
              filterInfo={filterInfo}
              filteredNodes={filteredNodes}
              floor={floor}
              selectNodeGeneral={props.selectNodeGeneral}
              deselectNodeGeneral={props.deselectNodeGeneral}
              selectedNode1={props.selectedNode1}
              selectedNode2={props.selectedNode2}
              handleNodeCreationRequest={handleNodeCreationRequest}
              transformState={transformState}
              setDataLoadedSoft={props.setDataLoadedSoft}
            />
          </>
        </TransformComponent>
      </TransformWrapper>
      {nodeCreationInfo.creatingNode ?
        <NodeCreator
          nodeCreationInfo={nodeCreationInfo}
          floor={floor}
          handleCloseDialogue={handleCloseNodeCreator}
          handleCreateNodeCallback={handleCreateNode}
        />
        :
        <></>
      }
    </Box>
  );
}
