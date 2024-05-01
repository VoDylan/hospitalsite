import Algorithms from "./Algorithms.ts";
// import { AStarAlgorithm } from "./AStarAlgorithm.ts";
import { BFSalgorithm } from "./BFSalgorithm.ts";
import { DFSalgorithm } from "./DFSalgorithm.ts";
import { DijkstrasAlgorithm } from "./DijkstrasAlgorithm.ts";
import { AStarAlgorithm } from "./AStarAlgorithm.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class DetermineAlgorithm {
  algorithm: Algorithms | undefined;

  chooseAlgorithm(algorithmName: string) {
    if (algorithmName === "ASTAR" || algorithmName === "A*")
      this.algorithm = new AStarAlgorithm();
    else if (algorithmName === "BFS") this.algorithm = new BFSalgorithm();
    else if (algorithmName === "DFS") this.algorithm = new DFSalgorithm();
    else if (algorithmName === "DIJKSTRA" || algorithmName === "Dijkstra")
      this.algorithm = new DijkstrasAlgorithm();
    else {
      this.algorithm = undefined;
      console.error("No algorithm found");
    }
  }

  async runAll(
    startID: string,
    endID: string,
  ): Promise<TypeCoordinates[] | undefined> {
    await this.algorithm?.loadData();
    return this.algorithm?.runAlgorithm(startID, endID);
  }
}
