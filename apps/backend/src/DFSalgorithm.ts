import Algorithms from "./Algorithms.ts";
import {IDCoordinates} from "common/src/IDCoordinates.ts";

export class DFSalgorithm extends Algorithms{
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



    return [];
  }
}
