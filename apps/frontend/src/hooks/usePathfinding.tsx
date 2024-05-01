import React, {SetStateAction, useState} from "react";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";
import {PathAlgorithmType} from "../common/types/PathAlgorithmType.ts";

export const usePathfinding = (): [
  TypeCoordinates[],
  React.Dispatch<SetStateAction<TypeCoordinates[]>>,
  boolean,
  React.Dispatch<SetStateAction<boolean>>,
  Map<TypeCoordinates, Floor>,
  React.Dispatch<SetStateAction<Map<TypeCoordinates, Floor>>>,
  Map<TypeCoordinates, Floor>,
  React.Dispatch<SetStateAction<Map<TypeCoordinates, Floor>>>,
  PathAlgorithmType,
  (algorithm: PathAlgorithmType) => void,
] => {
  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>([]);
  const [pathRendered, setPathRendered] = useState<boolean>(false);
  const [nodesToNextFloor, setNodesToNextFloor] = useState<Map<TypeCoordinates, Floor>>(new Map());
  const [nodesToPrevFloor, setNodesToPrevFloor] = useState<Map<TypeCoordinates, Floor>>(new Map());
  const [algorithm, setAlgorithm] = useState<PathAlgorithmType>(PathAlgorithmType.ASTAR);

  return [
    pathNodesData,
    setPathNodesData,
    pathRendered,
    setPathRendered,
    nodesToNextFloor,
    setNodesToNextFloor,
    nodesToPrevFloor,
    setNodesToPrevFloor,
    algorithm,
    setAlgorithm
  ];
};
