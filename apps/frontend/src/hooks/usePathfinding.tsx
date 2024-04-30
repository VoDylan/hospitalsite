import React, {SetStateAction, useState} from "react";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";

export const usePathfinding = (): [
  TypeCoordinates[],
  React.Dispatch<SetStateAction<TypeCoordinates[]>>,
  boolean,
  React.Dispatch<SetStateAction<boolean>>,
  Map<TypeCoordinates, Floor>,
  React.Dispatch<SetStateAction<Map<TypeCoordinates, Floor>>>,
  Map<TypeCoordinates, Floor>,
  React.Dispatch<SetStateAction<Map<TypeCoordinates, Floor>>>,
] => {
  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>([]);
  const [pathRendered, setPathRendered] = useState<boolean>(false);
  const [nodesToNextFloor, setNodesToNextFloor] = useState<Map<TypeCoordinates, Floor>>(new Map());
  const [nodesToPrevFloor, setNodesToPrevFloor] = useState<Map<TypeCoordinates, Floor>>(new Map());

  return [
    pathNodesData,
    setPathNodesData,
    pathRendered,
    setPathRendered,
    nodesToNextFloor,
    setNodesToNextFloor,
    nodesToPrevFloor,
    setNodesToPrevFloor,
  ];
};
