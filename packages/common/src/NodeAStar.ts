import { Coordinates } from "./Coordinates.ts";

export type NodeAStar = {
  startNodeID: string;
  neighbors: string[];
  coordinates: Coordinates;
};
