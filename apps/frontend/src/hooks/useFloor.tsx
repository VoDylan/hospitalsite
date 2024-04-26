import {useState} from "react";
import {Floor} from "common/src/map/Floor.ts";

export const useFloor = () => {
  const [floor, setFloor] = useState<Floor>(Floor.L1);
};
