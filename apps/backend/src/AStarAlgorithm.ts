import { NodeAStar } from "common/src/NodeAStar.ts";
import GraphManager from "common/src/GraphManager.ts";
import MapNode from "common/src/MapNode.ts";
import MapEdge from "common/src/MapEdge";
// import mapNode from "common/src/MapNode.ts";
// import MapNode from "common/src/MapNode.ts";

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

      let startX: number = -1;
      let startY: number = -1;
      let neighborX: number = -1;
      let neighborY: number = -1;

      // go through the whole list to find the coordinates of two nodes
      for (let j = 0; j < this.mapNodes.length; j++) {
        if (this.mapNodes[j].nodeID === currentNode.nodeID) {
          startX = this.mapNodes[j].xcoord;
          startY = this.mapNodes[j].ycoord;
        } else if (this.mapNodes[j].nodeID === neighbor.nodeID) {
          neighborX = this.mapNodes[j].xcoord;
          neighborY = this.mapNodes[j].ycoord;
        }

        if (startX !== -1 && neighborX !== -1) {
          break;
        }
      }

      if ([startX, startY, neighborX, neighborY].some((val) => val === -1)) {
        console.error("Node does not exist");
        return;
      }

      const distance: number = Math.sqrt(
        (neighborX - startX) ** 2 + (neighborY - startY) ** 2,
      );

      const updateNode = (
        nodeID: string,
        neighborID: string,
        distance: number,
      ) => {
        const index = this.nodes.findIndex(
          (node) => node.startNodeID === nodeID,
        );
        if (index === -1) {
          this.nodes.push({
            startNodeID: nodeID,
            neighbors: [neighborID],
            distances: [distance],
          });
        } else {
          this.nodes[index].neighbors.push(neighborID);
          this.nodes[index].distances.push(distance);
        }
      };

      updateNode(currentNode.nodeID, neighbor.nodeID, distance);
      updateNode(neighbor.nodeID, currentNode.nodeID, distance);
    }
  }

  private getID(longName: string) {
    if (longName === undefined) {
      console.error("Invalid Name");
      return;
    }
    return this.mapNodes.find((node) => node.longName === longName)?.nodeID;
  }

  private heuristic(startNodeID: string, endNodeID: string) {
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

  public AStar(startID: string, endID: string) {
    const startNodeID = this.getID(startID);
    const endNodeID = this.getID(endID);

    if (!startNodeID || !endNodeID) {
      console.error("Node ID not found for start or end node");
      return;
    }

    console.log(startID);
    console.log(endID);
    console.log(startNodeID);
    console.log(endNodeID);

    // const open: string[] = [];
    // const closed: string[] = [];
    // const gScores: number[] = [];
    // const fScores: number[] = [];
    // const parents: (string | null)[] = [];
    //
    // const startNodeIndex = this.nodes.findIndex(
    //   (node) => node.startNodeID === startNodeID,
    // );
    //
    // gScores[startNodeIndex] = 0;
    // fScores[startNodeIndex] = this.heuristic(startNodeID, endNodeID);
    // parents[startNodeIndex] = null;

    return this.nodes;
  }
}
