import React, {SetStateAction, useState} from "react";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

export const usePathfinding = (): [
  TypeCoordinates[],
  React.Dispatch<SetStateAction<TypeCoordinates[]>>
] => {
  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>([]);

  return [pathNodesData, setPathNodesData];
};
