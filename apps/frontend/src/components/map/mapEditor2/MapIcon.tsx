import MapNode from "common/src/map/MapNode.ts";
import {IRenderInfo} from "../../../hooks/useFilters.tsx";
import React, {useEffect, useState} from "react";
import {NodeType} from "common/src/map/MapNodeType.ts";
import Draggable, {DraggableEvent} from "react-draggable";
import {ReactZoomPanPinchState} from "react-zoom-pan-pinch";

interface MapIconProps {
  node: MapNode;
  renderInfo: IRenderInfo;
  selectNodeGeneral: (node: MapNode) => void;
  deselectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  transformState: ReactZoomPanPinchState;
}

interface MousePos {
  positionX: number;
  positionY: number;
}

export default function MapIcon(props: MapIconProps) {

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const [iconWidth, setIconWidth] = useState<number>(props.renderInfo.width);
  const [iconHeight, setIconHeight] = useState<number>(props.renderInfo.height);
  const [zIndex, setZIndex] = useState<number>(0);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [transformState, setTransformState] = useState<ReactZoomPanPinchState>(props.transformState);

  const handleMouseDownDraggable = (event: MouseEvent) => {
    if(selected)
      event.stopPropagation();
  };

  const handleDrag = (event: DraggableEvent) => {
    if(event.type == "mousemove" || event.type == "touchmove") {
      setIsDragging(true);
    }
  };

  const handleStopDrag = (event: DraggableEvent) => {
    if(event.type == "mouseup" || event.type == "touchend") {
      setTimeout(() => setIsDragging(false), 100);
    }
  };

  const handleHover = () => {
    if(!selected) {
      setIsHovered(true);
      setZIndex(1);
    }
  };

  const handleUnhover = () => {
    if(!selected) {
      setIsHovered(false);
      setZIndex(0);
    }
  };

  const handleClick = () => {
    if(isDragging) {
      setIsDragging(false);
      return;
    }

    if((props.selectedNode1 && props.selectedNode1.nodeID == props.node.nodeID) ||
       (props.selectedNode2 && props.selectedNode2.nodeID == props.node.nodeID)) {
      props.deselectNodeGeneral(props.node);
    } else {
      props.selectNodeGeneral(props.node);
    }
  };

  useEffect(() => {
    console.log("Updating transform state");
    setTransformState(props.transformState);
  }, [props.transformState, props.transformState.scale]);

  useEffect(() => {
    setIconWidth(props.renderInfo.width);
  }, [props.renderInfo.width]);

  useEffect(() => {
    setIconHeight(props.renderInfo.height);
  }, [props.renderInfo.height]);

  useEffect(() => {
    if((props.selectedNode1 && props.selectedNode1.nodeID == props.node.nodeID) ||
      (props.selectedNode2 && props.selectedNode2.nodeID == props.node.nodeID)) {
      setSelected(true);
      setZIndex(1);
    } else {
      setSelected(false);
      setZIndex(0);
    }
  }, [props.node.nodeID, props.selectedNode1, props.selectedNode2]);

  return (
    <Draggable
      onMouseDown={handleMouseDownDraggable}
      onDrag={handleDrag}
      onStop={handleStopDrag}
      scale={transformState.scale}
      disabled={!selected}
    >
      <div
        style={{
          position: "absolute",
          top: props.node.ycoord - (iconHeight / 2),
          left: props.node.xcoord - (iconWidth / 2),
          zIndex: zIndex,
          transform: (isHovered || selected) ? `scale(1.25)` : `scale(1)`,
          transition: !selected ? "transform 0.05s ease-in-out" : undefined,
          boxShadow: selected ? "0 0 2em 0.5em #003A96" : undefined,
          borderRadius: props.node.nodeType == NodeType.EXIT ? undefined : "100%",
          width: iconWidth,
          height: iconHeight,
        }}
        onMouseOver={() => handleHover()}
        onMouseOut={() => handleUnhover()}
        onClick={handleClick}
      >
        <img
          alt={props.node.nodeType}
          src={props.renderInfo.img}
          width={iconWidth}
          height={iconHeight}
        />
      </div>
    </Draggable>
  );
}
