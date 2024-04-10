import { Coordinates } from "common/src/Coordinates.ts";
import client from "../bin/database-connection.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import { nodesDistances } from "common/src/nodesDistances.ts";

export class testingDistance {
  mapNodes: MapNodeType[];
  mapEdges: MapEdgeType[];
  nodesDistances: nodesDistances[];
  floor: string;

  public constructor(floor: string) {
    this.mapNodes = [];
    this.mapEdges = [];
    this.nodesDistances = [];
    this.floor = floor;
  }

  async putIntoTypes() {
    this.mapNodes = await client.node.findMany();
    this.mapEdges = await client.edge.findMany();

    for (let i = 0; i < this.mapEdges.length; i++) {
      const startNode = this.mapNodes.find(
        (node) => node.nodeID === this.mapEdges[i].startNodeID,
      );
      const endNode = this.mapNodes.find(
        (node) => node.nodeID === this.mapEdges[i].endNodeID,
      );

      if (!startNode || !endNode) return undefined; // Either startNode or endNode not found

      // Check if both start and end nodes have the same floor
      if (startNode.floor === this.floor && endNode.floor === this.floor) {
        const startCoordinates: { x: number; y: number } | null =
          this.getCoordinates(startNode.nodeID);
        const endCoordinates: { x: number; y: number } | null =
          this.getCoordinates(endNode.nodeID);

        if (!startCoordinates || !endCoordinates) return undefined;

        this.nodesDistances[i] = {
          startCoords: startCoordinates,
          endCoords: endCoordinates,
          distance: this.getDistance(startCoordinates, endCoordinates),
        };
      }
    }

    this.print();

    return this.nodesDistances;
  }

  private getCoordinates(nodeID: string) {
    for (let i = 0; i < this.mapNodes.length; i++) {
      if (this.mapNodes[i].nodeID === nodeID)
        return { x: this.mapNodes[i].xcoord, y: this.mapNodes[i].ycoord };
    }

    console.log("Does not exist");

    return null;
  }

  private getDistance(
    startCoordinate: Coordinates,
    endCoordinate: Coordinates,
  ) {
    const deltaX: number = startCoordinate.x - endCoordinate.x;
    const deltaY: number = startCoordinate.y - endCoordinate.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  private print() {
    for (let i = 0; i < this.nodesDistances.length; i++) {
      console.log(this.nodesDistances[i]);
    }
  }
}
