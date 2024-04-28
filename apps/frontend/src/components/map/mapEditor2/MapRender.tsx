import {
  ReactZoomPanPinchContentRef,
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper
} from "react-zoom-pan-pinch";
import React, {useEffect, useRef, useState} from "react";
import {TransformState} from "../../../common/TransformState.ts";
import {IFilterState} from "../../../hooks/useFilters.tsx";
import BackgroundCanvas from "../BackgroundCanvas.tsx";
import {useCanvasInfo} from "../../../hooks/useCanvasInfo.tsx";
import {Floor} from "common/src/map/Floor.ts";
import EdgeCanvas from "../EdgeCanvas.tsx";
import MapNode from "common/src/map/MapNode.ts";
import {FilterType} from "../../../common/types/FilterType.ts";
import SymbolCanvas from "./SymbolCanvas.tsx";
import {useNodeCreationInfo} from "../../../hooks/useNodeCreationInfo.tsx";
import NodeCreator from "../NodeCreator.tsx";
import useWindowSize from "../../../hooks/useWindowSize.tsx";
import transformCoords2 from "../../../common/TransformCoords2.ts";
import {Box} from "@mui/material";

interface MapRenderProps {
  filterInfo: Map<FilterType, IFilterState>;
  floor: Floor;
  filteredNodes: MapNode[];
  selectNodeGeneral: (node: MapNode) => void;
  deselectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  dataLoaded: boolean;
  setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MapRender(props: MapRenderProps) {
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const transformState = useRef<TransformState>({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [nodeCreationInfo, setNodeCreationInfo] = useNodeCreationInfo();
  const [windowWidth, windowHeight] = useWindowSize();

  const [filterInfo, setFilterInfo] = useState<Map<FilterType, IFilterState>>(props.filterInfo);
  const [floor, setFloor] = useState<Floor>(props.floor);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>(props.filteredNodes);

  const transformWrapperRef = useRef<ReactZoomPanPinchContentRef>(null);

  const [
    backgroundRendered,
    setBackgroundRendered,
    canvasWidth,
    setCanvasWidth,
    canvasHeight,
    setCanvasHeight
  ] = useCanvasInfo();

  const handleTransform = (
    ref: ReactZoomPanPinchRef,
    state: { scale: number; positionX: number; positionY: number },
  ) => {
    if (!transformRef.current) transformRef.current = ref;
    transformState.current = state;
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
    props.setDataLoaded(false);
  };

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  useEffect(() => {
    setFloor(props.floor);
    if(transformRef.current) {
      transformRef.current.resetTransform();
    }
  }, [props.floor]);

  useEffect(() => {
    setFilteredNodes(props.filteredNodes);
  }, [props.filteredNodes]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
    >
      <TransformWrapper
        onTransformed={handleTransform}
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
                // minHeight: "100vh",
                // maxHeight: "100%",
                maxWidth: "100%",
              }}
              floor={floor}
              renderStatusCallback={handleBackgroundRenderStatus}
            />
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
              dataLoaded={props.dataLoaded}
            />
            <SymbolCanvas
              backgroundRendered={backgroundRendered}
              filterInfo={filterInfo}
              filteredNodes={filteredNodes}
              floor={floor}
              selectNodeGeneral={props.selectNodeGeneral}
              deselectNodeGeneral={props.deselectNodeGeneral}
              selectedNode1={props.selectedNode1}
              selectedNode2={props.selectedNode2}
              handleNodeCreationRequest={handleNodeCreationRequest}
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
