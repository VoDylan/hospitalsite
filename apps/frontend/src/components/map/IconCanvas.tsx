import React, {useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Floor} from "common/src/map/Floor.ts";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {useFloorIcons} from "../../hooks/useFloorIcons.tsx";

interface IconProps {
  style?: React.CSSProperties;
  backgroundRendered: boolean;
  startNode: MapNode | null;
  endNode: MapNode | null;

  nodesToNextFloor: Map<TypeCoordinates, Floor>;
  nodesToPrevFloor: Map<TypeCoordinates, Floor>;

  floor: Floor;
}

const START_ICON_LENGTH: number = 45;
const END_ICON_LENGTH: number = 60;

const FLOOR_ICON_LENGTH: number = 60;

export default function IconCanvas(props: IconProps) {
  const [startNode, setStartNode] = useState<MapNode | null>(props.startNode);
  const [endNode, setEndNode] = useState<MapNode | null>(props.endNode);

  const [nodesToNextFloor, setNodesToNextFloor] = useState<Map<TypeCoordinates, Floor>>(props.nodesToNextFloor);
  const [nodesToPrevFloor, setNodesToPrevFloor] = useState<Map<TypeCoordinates, Floor>>(props.nodesToPrevFloor);

  const [floor, setFloor] = useState<Floor>(props.floor);

  const [
    floorToIconNextImageMap,
    floorToIconPrevImageMap,
  ] = useFloorIcons();

  const getAllFloorIcons = () => {
    const icons: React.JSX.Element[] = [];

    nodesToNextFloor.forEach((value: Floor, key: TypeCoordinates) => {
      if(key.floor !== floor) return;
      icons.push(
        <img
          key={`${key.nodeID}_next`}
          alt={`${value}NextIcon`}
          src={floorToIconNextImageMap.get(value)!}
          width={FLOOR_ICON_LENGTH}
          height={FLOOR_ICON_LENGTH}
          style={{
            position: "absolute",
            left: key.coordinates.x - (FLOOR_ICON_LENGTH / 2),
            top: key.coordinates.y - (FLOOR_ICON_LENGTH / 2),
            zIndex: 2,
          }}
        />
      );
    });

    nodesToPrevFloor.forEach((value: Floor, key: TypeCoordinates) => {
      if(key.floor !== floor) return;
      icons.push(
        <img
          key={`${key.nodeID}_prev`}
          alt={`${value}PrevIcon`}
          src={floorToIconPrevImageMap.get(value)!}
          width={FLOOR_ICON_LENGTH}
          height={FLOOR_ICON_LENGTH}
          style={{
            position: "absolute",
            left: key.coordinates.x - (FLOOR_ICON_LENGTH / 2),
            top: key.coordinates.y - (FLOOR_ICON_LENGTH / 2),
            zIndex: 2,
          }}
        />
      );
    });

    return icons;
  };

  useEffect(() => {
    setStartNode(props.startNode);
  }, [props.startNode]);

  useEffect(() => {
    setEndNode(props.endNode);
  }, [props.endNode]);

  useEffect(() => {
    setFloor(props.floor);
  }, [props.floor]);

  useEffect(() => {
    setNodesToNextFloor(props.nodesToNextFloor);
  }, [props.nodesToNextFloor]);

  useEffect(() => {
    setNodesToPrevFloor(props.nodesToPrevFloor);
  }, [props.nodesToPrevFloor]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        ...props.style
      }}
    >
      {startNode && floor == (startNode.floor as Floor) && (
        <RadioButtonCheckedIcon
          color={"primary"}
          style={{
            color: "blue",
            position: "absolute",
            left: startNode.xcoord - (START_ICON_LENGTH / 2),
            top: startNode.ycoord - (START_ICON_LENGTH / 2),
            width: START_ICON_LENGTH,
            height: START_ICON_LENGTH,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      {endNode && floor == (endNode.floor as Floor) && (
        <LocationOnIcon
          style={{
            color: "red",
            position: "absolute",
            left: endNode.xcoord - (END_ICON_LENGTH / 2),
            top: endNode.ycoord - (END_ICON_LENGTH),
            width: END_ICON_LENGTH,
            height: END_ICON_LENGTH,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      {getAllFloorIcons()}
    </div>
  );
}
