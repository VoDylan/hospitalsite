import { IDCoordinates } from "common/src/IDCoordinates.ts";

interface Algorithms {
  loadData(): void;
  runAlgorithm(start: string, end: string): IDCoordinates[];
}

export default Algorithms;
