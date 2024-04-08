import { NodeAStar } from "common/src/NodeAStar.ts";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import GraphManager from "common/src/map/GraphManager.ts";
import { Coordinates } from "common/src/Coordinates.ts";

export class AStarAlgorithm {
  nodes: NodeAStar[];
  mapNodes: MapNode[];
  mapEdges: MapEdge[];

  public constructor() {
    this.nodes = [];
    const graphManager = GraphManager.getInstance();
    this.mapNodes = graphManager.nodes;
    this.mapEdges = graphManager.edges;
  }

  public loadData() {
    for (let i = 0; i < this.mapEdges.length; i++) {
      const currentNode: MapNode = this.mapEdges[i].startNode;
      const neighbor: MapNode = this.mapEdges[i].endNode;

      const updateNode = (nodeID: string, neighborID: string) => {
        const index = this.nodes.findIndex(
          (node) => node.startNodeID === nodeID,
        );
        if (index === -1) {
          this.nodes.push({
            startNodeID: nodeID,
            neighbors: [neighborID],
          });
        } else {
          this.nodes[index].neighbors.push(neighborID);
        }
      };

      updateNode(currentNode.nodeID, neighbor.nodeID);
      updateNode(neighbor.nodeID, currentNode.nodeID);
    }
  }

  private getID(longName: string) {
    if (longName === undefined) {
      console.error("Invalid Name");
      return;
    }
    return this.mapNodes.find((node) => node.longName === longName)?.nodeID;
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

    // if ([startX, startY, neighborX, neighborY].some((val) => val === -1)) {
    //   console.error("Node does not exist");
    //   return -1;
    // }

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

  public AStar(startNodeID: string, endNodeID: string) {
    // const startNodeID = this.getID(startID);
    // const endNodeID = this.getID(endID);

    if (!startNodeID || !endNodeID) {
      console.error("Node ID not found for start or end node");
      return;
    }

    const open = new Map();
    const closed: string[] = [];
    const gScores: number[] = [];
    const fScores: number[] = [];
    const parents: (string | null)[] = [];

    const startNodeIndex = this.nodes.findIndex(
      (node) => node.startNodeID === startNodeID,
    );

    gScores[startNodeIndex] = 0;
    fScores[startNodeIndex] = this.distance(startNodeID, endNodeID);
    parents[startNodeIndex] = null;
    open.set(startNodeID, fScores[startNodeIndex]);

    while (open.size > 0) {
      const currentNodeID = this.shortestDistance(open);
      open.delete(currentNodeID);

      const currentNodeIndex = this.nodes.findIndex(
        (node) => node.startNodeID === currentNodeID,
      );

      if (currentNodeID === endNodeID) {
        const coordinatesPath: Coordinates[] = [];
        const path: string[] = [];
        let current: string | null = currentNodeID;
        while (current !== startNodeID) {
          let currentIdx: number = -1;
          if (current) {
            path.unshift(current);
            coordinatesPath.unshift(this.getCoordinates(current));
            currentIdx = this.nodes.findIndex(
              (node) => node.startNodeID === current,
            );
          }
          current = parents[currentIdx];
        }
        coordinatesPath.unshift(this.getCoordinates(startNodeID));
        path.unshift(startNodeID);

        console.log("Path found:", path);
        console.log("Coordinates found:", coordinatesPath);
        return coordinatesPath;
      }

      const currentNode = this.nodes[currentNodeIndex];

      console.log(currentNode);
      if (currentNode === undefined) {
        console.error("Invalid node");
        return null;
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
            currentNeighborCost + this.distance(currentNeighborID, endNodeID),
          );
        }
        gScores[currentNeighborIndex] = currentNeighborCost;
        parents[currentNeighborIndex] = currentNodeID;
      }
      closed.push(currentNodeID);
    }

    return null;
  }
}
