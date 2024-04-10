import { IDCoordinates } from "common/src/IDCoordinates.ts";

interface Algorithms {
  loadData(): Promise<void>;
  runAlgorithm(start: string, end: string): IDCoordinates[];
}

export default Algorithms;
