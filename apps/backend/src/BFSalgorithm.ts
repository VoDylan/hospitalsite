import Algorithms from "./Algorithms.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class BFSalgorithm extends Algorithms {
  runAlgorithm(start: string, end: string): TypeCoordinates[] {
    const queue: string[] = [];
    const visited: string[] = [];
    const parents: (string | null)[] = [];
    const startNodeIndex: number = this.nodes.findIndex(
      (node) => node.startNodeID === start,
    );
    queue.push(start);
    visited.push(start);
    parents[startNodeIndex] = null;

    while (queue.length > 0) {
      const currentNodeID = queue.shift();
      const currentNode = this.nodes.find(
        (node) => node.startNodeID === currentNodeID,
      )!;

      if (currentNodeID === end) {
        return this.ending(currentNodeID, start, parents);
      }

      for (let i = 0; i < currentNode.neighbors.length; i++) {
        const neighborID = currentNode.neighbors[i];

        if (!visited.includes(neighborID)) {
          const neighborIndex = this.nodes.findIndex(
            (node) => node.startNodeID === neighborID,
          );
          parents[neighborIndex] = currentNodeID!;

          visited.push(neighborID);
          queue.push(neighborID);
        }
      }
    }

    return [];
  }
}
