import client from "./bin/database-connection.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import { nodeAlgorithms } from "common/src/nodeAlgorithms.ts";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";

abstract class Algorithms {
  mapNodes: MapNodeType[];
  mapEdges: MapEdgeType[];
  nodes: nodeAlgorithms[];

  constructor() {
    this.mapNodes = [];
    this.mapEdges = [];
    this.nodes = [];
  }

  async loadData(): Promise<void> {
    this.mapNodes = await client.node.findMany();
    this.mapEdges = await client.edge.findMany();

    for (let i = 0; i < this.mapEdges.length; i++) {
      const currentNode: string = this.mapEdges[i].startNodeID;
      const neighbor: string = this.mapEdges[i].endNodeID;

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

      updateNode(currentNode, neighbor);
      updateNode(neighbor, currentNode);
    }
  }

  getCoordinates(currentNode: string) {
    const Node = this.mapNodes.find((node) => node.nodeID === currentNode);
    if (!Node) {
      console.log("Could not get coordinates");
      return { x: 0, y: 0 };
    }

    return { x: Node.xcoord, y: Node.ycoord };
  }

  abstract runAlgorithm(start: string, end: string): TypeCoordinates[];
}

export default Algorithms;
