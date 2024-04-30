import MapNode from "common/src/map/MapNode.ts";
import {IRenderInfo} from "frontend/src/hooks/useFilters.tsx";
import React, {useEffect, useRef, useState} from "react";
import {MapNodeType, NodeType} from "common/src/map/MapNodeType.ts";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {ReactZoomPanPinchState} from "react-zoom-pan-pinch";
import GraphManager from "frontend/src/common/GraphManager.ts";

interface MapIconProps {
  node: MapNode;
  renderInfo: IRenderInfo;
  selectNodeGeneral: (node: MapNode) => void;
  deselectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  transformState: ReactZoomPanPinchState;
  setDataLoadedSoft: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IconPosition {
  x: number,
  y: number,
}

const SCALE_FACTOR: number = 1.25;

export default function MapIcon(props: MapIconProps) {
  const iconRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const [iconWidth, setIconWidth] = useState<number>(props.renderInfo.width);
  const [iconHeight, setIconHeight] = useState<number>(props.renderInfo.height);
  const [zIndex, setZIndex] = useState<number>(0);

  const [initPosition,] = useState<IconPosition>({
    x: props.node.xcoord - (props.renderInfo.width / 2),
    y: props.node.ycoord - (props.renderInfo.height / 2),
  });

  const [position, setPosition] = useState<IconPosition>({
    x: initPosition.x,
    y: initPosition.y,
  });

  const [preDragPosition, setPreDragPosition] = useState<IconPosition>({
    x: initPosition.x,
    y: initPosition.y,
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [transformState, setTransformState] = useState<ReactZoomPanPinchState>(props.transformState);

  const handleMouseDownDraggable = (event: MouseEvent) => {
    if(selected) {
      event.stopPropagation();
    }
  };

  const handleDragStart = (event: DraggableEvent) => {
    if(event.type == "mousemove" || event.type == "touchmove") {
      console.log("Dragging start");
      setIsDragging(true);
      setPreDragPosition(position);
    }
  };

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    const newPosition: IconPosition = {
      x: data.x,
      y: data.y,
    };

    const newNodeInfo: MapNodeType = props.node.nodeInfo;

    newNodeInfo.xcoord = newPosition.x;
    newNodeInfo.ycoord = newPosition.y;

    console.log("Dragging");
    setIsDragging(true);
    setPosition(newPosition);
    GraphManager.getInstance().updateLocalNode(newNodeInfo);
  };

  const handleDragStop = (event: DraggableEvent, data: DraggableData) => {
    if(Math.abs(initPosition.x - data.x) < 10 && Math.abs(initPosition.y - data.y) < 10) {
      setIsDragging(false);
      handleClick();
    }
    if(event.type == "mouseup" || event.type == "touchend") {
      const nodeInfo: MapNodeType = props.node.nodeInfo;
      nodeInfo.xcoord = position.x + (props.renderInfo.width / 2);
      nodeInfo.ycoord = position.y + (props.renderInfo.height / 2);
      GraphManager.getInstance().updateLocalNode(nodeInfo);
      props.setDataLoadedSoft(false);
      setTimeout(() => {
        console.log("Dragging stopped");
        setIsDragging(false);
      }, 100);
    }
  };

  const handleHover = () => {
    if(!selected) {
      if(iconRef.current) {
        // iconRef.current.style.transform = `translate(${currPositionX}, ${currPositionY}) scale(${SCALE_FACTOR})`;
      }

      setIsHovered(true);
      setZIndex(1);
    }
  };

  const handleUnhover = () => {
    if(!selected) {
      if(iconRef.current) {
        // iconRef.current.style.transform = `translate(${currPositionX}, ${currPositionY}) scale(1.0)`;
        // iconRef.current.style.scale = "1.0";
      }
      setIsHovered(false);
      setZIndex(0);
    }
  };

  const handleClick = () => {
    if(isDragging) {
      setIsDragging(false);
      return;
    }

    console.log("Handling icon click");

    if(((props.selectedNode1 && props.selectedNode1.nodeID == props.node.nodeID) ||
       (props.selectedNode2 && props.selectedNode2.nodeID == props.node.nodeID)) && !isDragging) {
      props.deselectNodeGeneral(props.node);
    } else {
      props.selectNodeGeneral(props.node);
    }
  };

  useEffect(() => {
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
      // if(iconRef.current) {
      //   iconRef.current.style.transform = `translate(${currPositionX}, ${currPositionY}) scale(${SCALE_FACTOR})`;
      //   console.log(`Set transform to "${iconRef.current.style.transform}"`);
      // }
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
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      scale={transformState.scale}
      disabled={!selected}
      position={position}
    >
      <div
        style={{
          position: "absolute",
          zIndex: zIndex,
          boxShadow: selected ? "0 0 2em 0.5em #003A96" : undefined,
          borderRadius: props.node.nodeType == NodeType.EXIT ? undefined : "100%",
          width: iconWidth,
          height: iconHeight,
        }}
        onMouseOver={() => handleHover()}
        onMouseOut={() => handleUnhover()}
        onMouseDown={() => console.log(`Mouse down on node ${props.node.nodeID}`)}
        onClick={handleClick}
        ref={iconRef}
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
