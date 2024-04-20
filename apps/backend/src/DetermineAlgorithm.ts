import Algorithms from "./Algorithms.ts";
// import { AStarAlgorithm } from "./AStarAlgorithm.ts";
import { BFSalgorithm } from "./BFSalgorithm.ts";
import { DFSalgorithm } from "./DFSalgorithm.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { DijkstrasAlgorithm } from "./DijkstrasAlgorithm.ts";

export class DetermineAlgorithm {
  algorithm: Algorithms | undefined;

  chooseAlgorithm(algorithmName: string) {
    if (algorithmName === "A*") this.algorithm = new DijkstrasAlgorithm();
    else if (algorithmName === "BFS") this.algorithm = new BFSalgorithm();
    else if (algorithmName === "DFS") this.algorithm = new DFSalgorithm();
    else {
      this.algorithm = undefined;
      console.error("No algorithm found");
    }
  }

  async runAll(
    startID: string,
    endID: string,
  ): Promise<IDCoordinates[] | undefined> {
    await this.algorithm?.loadData();
    return this.algorithm?.runAlgorithm(startID, endID);
  }
}
