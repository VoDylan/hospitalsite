import MapNode from "common/src/map/MapNode.ts";
import {IRenderInfo} from "../../../hooks/useFilters.tsx";
import {useEffect, useState} from "react";

interface MapIconProps {
  node: MapNode;
  renderInfo: IRenderInfo;
  selectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
}

export default function MapIcon(props: MapIconProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const [iconWidth, setIconWidth] = useState<number>(props.renderInfo.width);
  const [iconHeight, setIconHeight] = useState<number>(props.renderInfo.height);
  const [zIndex, setZIndex] = useState<number>(0);

  const handleHover = () => {
    setIsHovered(true);
    setZIndex(1);
  };

  const handleUnhover = () => {
    setIsHovered(false);
    setZIndex(0);
  };

  useEffect(() => {
    setIconWidth(props.renderInfo.width);
  }, [props.renderInfo.width]);

  useEffect(() => {
    setIconHeight(props.renderInfo.height);
  }, [props.renderInfo.height]);

  useEffect(() => {
    console.log("Checking selection");
    if(props.selectedNode1 && props.selectedNode1.nodeID == props.node.nodeID) {
      setSelected(true);
      return;
    }
    if(props.selectedNode2 && props.selectedNode2.nodeID == props.node.nodeID) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [props.node.nodeID, props.selectedNode1, props.selectedNode2]);

  useEffect(() => {
    console.log(`Selected: ${selected}`);
  }, [selected]);

  return (
    <div
      style={{
        position: "absolute",
        top: props.node.ycoord - (iconHeight / 2),
        left: props.node.xcoord - (iconWidth / 2),
        zIndex: zIndex,
        transform: (isHovered || selected) ? `scale(1.25)` : `scale(1)`,
        transition: "all 0.05s ease-in-out",
        boxShadow: selected ? "2em 2em 2em 2em #F6BD38" : undefined,
      }}
      onMouseOver={() => handleHover()}
      onMouseOut={() => handleUnhover()}
      onClick={() => props.selectNodeGeneral(props.node)}
    >
      <img
        alt={props.node.nodeType}
        src={props.renderInfo.img}
        width={iconWidth}
        height={iconHeight}
      />
    </div>

  );
}
