import React, {useState} from "react";
import {Floor} from "common/src/map/Floor.ts";

export const useFloor = (): [
  Floor,
  React.Dispatch<React.SetStateAction<Floor>>
] => {
  const [floor, setFloor] = useState<Floor>(Floor.L1);

  return [floor, setFloor];
};
