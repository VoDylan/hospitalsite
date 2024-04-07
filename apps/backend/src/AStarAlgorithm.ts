import { NodeAStar } from "common/src/NodeAStar.ts";
import GraphManager from "common/src/GraphManager.ts";
import MapNode from "common/src/MapNode.ts";
// import MapNode from "common/src/MapNode.ts";

export class AStarAlgorithm {
  nodes: NodeAStar[];

  public constructor() {
    this.nodes = [];
  }

  public loadData() {
    const graphManager = GraphManager.getInstance();
    const mapNodes = graphManager.nodes;
    const mapEdges = graphManager.edges;

    for (let i = 0; i < mapEdges.length; i++) {
      const currentNode: MapNode = mapEdges[i].startNode;
      const neighbor: MapNode = mapEdges[i].endNode;

      let startX: number = -1;
      let startY: number = -1;
      let neighborX: number = -1;
      let neighborY: number = -1;

      // go through the whole list to find the coordinates of two nodes
      for (let j = 0; j < mapNodes.length; j++) {
        if (mapNodes[j].nodeID === currentNode.nodeID) {
          startX = mapNodes[j].xcoord;
          startY = mapNodes[j].ycoord;
        }
        if (mapNodes[j].nodeID === neighbor.nodeID) {
          neighborX = mapNodes[j].xcoord;
          neighborY = mapNodes[j].ycoord;
        }
      }

      if ([startX, startY, neighborX, neighborY].some((val) => val === -1)) {
        console.error("Node does not exist");
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

  public AStar(startID: string, endID: string) {
    console.log(startID);
    console.log(endID);
    return this.nodes;
  }
}
