import { IDCoordinates } from "common/src/IDCoordinates.ts";
import Algorithms from "./Algorithms.ts";

export class AStarAlgorithm extends Algorithms {
  public constructor() {
    super();
  }

  async loadData() {
    await super.loadData();
  }

  private distance(startNodeID: string, endNodeID: string) {
    let startX: number = -1;
    let startY: number = -1;
    let neighborX: number = -1;
    let neighborY: number = -1;

    for (let i = 0; i < this.mapNodes.length; i++) {
      if (this.mapNodes[i].nodeID === startNodeID) {
        startX = this.mapNodes[i].xcoord;
        startY = this.mapNodes[i].ycoord;
      } else if (this.mapNodes[i].nodeID === endNodeID) {
        neighborX = this.mapNodes[i].xcoord;
        neighborY = this.mapNodes[i].ycoord;
      }

      if (startX !== -1 && neighborX !== -1) {
        break;
      }
    }

    if ([startX, startY, neighborX, neighborY].some((val) => val === -1)) {
      console.error("Node does not exist");
      return -1;
    }

    return Math.sqrt((neighborX - startX) ** 2 + (neighborY - startY) ** 2);
  }

  private shortestDistance(open: Map<string, number>) {
    let minValue: number = Infinity;
    let minKey: string = "";

    for (const [key, value] of open) {
      if (value < minValue) {
        minValue = value;
        minKey = key;
      }
    }

    return minKey;
  }

  private getCoordinates(currentNode: string) {
    const Node = this.mapNodes.find((node) => node.nodeID === currentNode);
    if (!Node) {
      console.log("Could not get coordinates");
      return { x: 0, y: 0 };
    }

    return { x: Node.xcoord, y: Node.ycoord };
  }

  runAlgorithm(start: string, end: string): IDCoordinates[] {
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
    fScores[startNodeIndex] = this.distance(start, end);
    parents[startNodeIndex] = null;
    open.set(start, fScores[startNodeIndex]);

    while (open.size > 0) {
      const currentNodeID = this.shortestDistance(open);
      open.delete(currentNodeID);

      const currentNodeIndex = this.nodes.findIndex(
        (node) => node.startNodeID === currentNodeID,
      );

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

        // console.log("Path found:", path);
        // console.log("Coordinates found:", coordinatesPath);

        return coordinatesPath;
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
          this.distance(currentNodeID, currentNeighborID);

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
            currentNeighborCost + this.distance(currentNeighborID, end),
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
