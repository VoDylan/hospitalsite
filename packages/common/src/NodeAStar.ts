import { NeighborsIndex } from "./NeighborsIndex.ts";

export type NodeAStar = {
  startNodeID: string;
  neighbors: NeighborsIndex[];
  distances: number[];
};
