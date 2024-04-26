import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useEffect, useRef, useState} from "react";
import {TransformState} from "../../../common/TransformState.ts";
import {IFilterState} from "../../../hooks/useFilters.tsx";
import BackgroundCanvas from "../BackgroundCanvas.tsx";
import {useCanvasInfo} from "../../../hooks/useCanvasInfo.tsx";
import {Floor} from "common/src/map/Floor.ts";
import EdgeCanvas from "../EdgeCanvas.tsx";
import MapNode from "common/src/map/MapNode.ts";
import {FilterType} from "../../../common/types/FilterType.ts";
import SymbolCanvas from "./SymbolCanvas.tsx";

interface MapRenderProps {
  filterInfo: Map<FilterType, IFilterState>;
  floor: Floor;
  filteredNodes: MapNode[];
}

export default function MapRender(props: MapRenderProps) {
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const transformState = useRef<TransformState>({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [filterInfo, setFilterInfo] = useState<Map<FilterType, IFilterState>>(props.filterInfo);
  const [floor, setFloor] = useState<Floor>(props.floor);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>(props.filteredNodes);

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

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  useEffect(() => {
    setFloor(props.floor);
  }, [props.floor]);

  useEffect(() => {
    setFilteredNodes(props.filteredNodes);
  }, [props.filteredNodes]);

  return (
    <>
      <TransformWrapper
        onTransformed={handleTransform}
        minScale={0.8}
        initialScale={1.0}
        initialPositionX={0}
        initialPositionY={0}
        doubleClick={{disabled: true}}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          <>
            <BackgroundCanvas
              style={{
                position: "relative",
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
            />
            <SymbolCanvas
              backgroundRendered={backgroundRendered}
              width={canvasWidth}
              height={canvasHeight}
              filterInfo={filterInfo}
              filteredNodes={filteredNodes}
              floor={floor}
            />
          </>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
