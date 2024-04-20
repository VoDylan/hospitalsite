import Algorithms from "./Algorithms.ts";
import {IDCoordinates} from "common/src/IDCoordinates.ts";

export class DijkstrasAlgorithm extends Algorithms{
  public constructor() {
    super();
  }

  async loadData() {
    await super.loadData();
  }

  runAlgorithm(start: string, end: string): IDCoordinates[] {
    return [];
  }
}
