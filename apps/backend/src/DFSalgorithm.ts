import Algorithms from "./Algorithms.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class DFSalgorithm extends Algorithms {
  runAlgorithm(start: string, end: string): TypeCoordinates[] {
    /*

    PSEUDOCODE

    let there be a stack with just node ids -> push start to the stack
    push start as visited

    while the stack is not empty
      take a new node which is the first node of the stack
      remove the node from the stack

      for all neighbors for the new node
        if the neighbor is not visited
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
          stack.unshift(neighborID);
        }
      }
    }

    return [];
  }
}
