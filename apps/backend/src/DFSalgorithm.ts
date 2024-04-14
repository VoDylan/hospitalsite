import Algorithms from "./Algorithms.ts";
import {IDCoordinates} from "common/src/IDCoordinates.ts";

export class DFSalgorithm extends Algorithms {
  constructor() {
    super();
  }

  async loadData(){
    await super.loadData();
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
    const startNodeIndex: number = this.nodes.findIndex((node) => node.startNodeID === start);
    stack[startNodeIndex] = start;
    visited[startNodeIndex] = start;

    while (stack.length > 0) {
      const currentNodeID = stack.shift();
      const currentNode = this.nodes.find((node) => node.startNodeID === currentNodeID)!;

      for (let i = 0; i < currentNode.neighbors.length; i++) {
        if (!visited.includes(currentNode.neighbors[i])){
          visited.push(currentNode.neighbors[i]);
          stack.push(currentNode.neighbors[i]);
        }
      }
    }


    return [];
  }
}
