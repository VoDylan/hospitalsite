import Algorithms from "./Algorithms.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { Coordinates } from "common/src/Coordinates.ts";

export class DFSalgorithm extends Algorithms {
  constructor() {
    super();
  }

  async loadData() {
    await super.loadData();
  }

  getCoordinates(currentNode: string): Coordinates {
    return super.getCoordinates(currentNode);
  }

  runAlgorithm(start: string, end: string): IDCoordinates[] {
    /*

    PSEUDOCODE

    let there be a stack with just node ids -> push start to the stack
    push start as visited

    while the stack is not empty
      take a new node which is the first node of the stack
      remove the node from the stack

      for all neighbors for the new node
        if the neighbor is not visites
          push neighbor as visited
          push neighbor in the stack
     */

    const stack: string[] = [];
    const visited: string[] = [];
    const parents: string[] = [];
    const startNodeIndex: number = this.nodes.findIndex(
      (node) => node.startNodeID === start,
    );
    stack.push(start);
    visited.push(start);
    parents[startNodeIndex] = "";

    while (stack.length > 0) {
      const currentNodeID = stack.shift();
      const currentNode = this.nodes.find(
        (node) => node.startNodeID === currentNodeID,
      )!;

      if (currentNodeID === end) {
        const coordinatesPath: IDCoordinates[] = [];
        const path: string[] = [];
        let current: string | null = currentNodeID;
        while (current !== start) {
          let currentIdx: number = -1;
          if (current) {
            path.unshift(current);
            coordinatesPath.unshift({
              nodeID: current,
              coordinates: this.getCoordinates(current),
            });
            currentIdx = this.nodes.findIndex(
              (node) => node.startNodeID === current,
            );
          }
          current = parents[currentIdx];
        }
        coordinatesPath.unshift({
          nodeID: start,
          coordinates: this.getCoordinates(start),
        });
        path.unshift(start);

        console.log("Path found:", path);

        return coordinatesPath;
      }

      for (let i = 0; i < currentNode.neighbors.length; i++) {
        const neighborID = currentNode.neighbors[i];

        if (!visited.includes(neighborID)) {
          const neighborIndex = this.nodes.findIndex(
            (node) => node.startNodeID === neighborID,
          );
          parents[neighborIndex] = currentNodeID!;

          visited.push(neighborID);
          stack.push(neighborID);
        }
      }
    }

    return [];
  }
}
