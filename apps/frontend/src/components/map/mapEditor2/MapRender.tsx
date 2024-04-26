import {Box, Stack} from "@mui/material";
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {useEffect, useRef, useState} from "react";
import {TransformState} from "../../../common/TransformState.ts";
import ToggleButton from "../MapToggleBar.tsx";
import Legend from "./Legend.tsx";
import {useLegend} from "../../../hooks/useLegend.tsx";
import {IFilterState} from "../../../hooks/useFilters.tsx";

interface MapRenderProps {
  filterInfo: IFilterState[];
}

export default function MapRender(props: MapRenderProps) {
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const transformState = useRef<TransformState>({
    scale: 1,
    positionX: 0,
    positionY: 0,
  });

  const [filterInfo, setFilterInfo] = useState<IFilterState[]>(props.filterInfo);

  const [
    isOpen,
    setIsOpen
  ] = useLegend();

  const handleTransform = (
    ref: ReactZoomPanPinchRef,
    state: { scale: number; positionX: number; positionY: number },
  ) => {
    if (!transformRef.current) transformRef.current = ref;
    transformState.current = state;
  };

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
    >
      <TransformWrapper
        onTransformed={handleTransform}
        minScale={0.8}
        initialScale={1.0}
        initialPositionX={0}
        initialPositionY={0}
        doubleClick={{disabled: true}}
      >
        <TransformComponent>
          <></>
        </TransformComponent>
      </TransformWrapper>
      <Stack direction={"row"}>
        <Box
          position={"absolute"}
          right={0}
          width={"200px"}
          margin={"25px"}
        >
          {/* Toggle button */}
          <ToggleButton onClick={() => setIsOpen(!isOpen)} buttonText={isOpen ? "Hide Legend" : "Show Legend"} />
          {isOpen && (
            <Legend filterInfo={[...filterInfo.values()]}/>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
