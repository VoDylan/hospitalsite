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
    return [];
  }
}
