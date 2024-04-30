import Algorithms from "./Algorithms.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class AStarAlgorithm extends Algorithms {
  runAlgorithm(start: string, end: string): TypeCoordinates[] {
    if (!start || !end) {
      console.error("Node ID not found for start or end node");
      return [];
    }

    const open = new Map();
    const closed: string[] = [];
    const gScores: number[] = [];
    const fScores: number[] = [];
    const parents: (string | null)[] = [];

    const startNodeIndex = this.nodes.findIndex(
      (node) => node.startNodeID === start,
    );

    console.log(this.nodes);

    gScores[startNodeIndex] = 0;
    fScores[startNodeIndex] = this.distance(start, end)!;
    parents[startNodeIndex] = null;
    open.set(start, fScores[startNodeIndex]);

    while (open.size > 0) {
      const currentNodeID = this.shortestDistance(open);
      open.delete(currentNodeID);

      const currentNodeIndex = this.nodes.findIndex(
        (node) => node.startNodeID === currentNodeID,
      );

      if (currentNodeID === end) {
        return this.ending(currentNodeID, start, parents);
      }

      const currentNode = this.nodes[currentNodeIndex];

      // console.log(currentNode);
      if (currentNode === undefined) {
        console.error("Invalid node");
        return [];
      }

      for (let i = 0; i < currentNode.neighbors.length; i++) {
        const currentNeighborID = currentNode.neighbors[i];
        const currentNeighborIndex = this.nodes.findIndex(
          (node) => node.startNodeID === currentNeighborID,
        );

        const currentNeighborCost: number =
          gScores[currentNodeIndex] +
          this.distance(currentNodeID, currentNeighborID)!;

        if (open.has(currentNeighborID)) {
          if (gScores[currentNeighborIndex] <= currentNeighborCost) {
            continue;
          }
        } else if (closed.includes(currentNeighborID)) {
          if (gScores[currentNeighborIndex] <= currentNeighborCost) continue;
          closed.splice(currentNeighborIndex, 1);
          open.set(currentNeighborID, fScores[currentNeighborIndex]);
        } else {
          open.set(
            currentNeighborID,
            currentNeighborCost + this.distance(currentNeighborID, end)!,
          );
        }
        gScores[currentNeighborIndex] = currentNeighborCost;
        parents[currentNeighborIndex] = currentNodeID;
      }
      closed.push(currentNodeID);
    }

    return [];
  }
}
