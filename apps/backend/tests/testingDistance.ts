import { Coordinates } from "common/src/Coordinates.ts";
import client from "../src/bin/database-connection.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";

type nodesDistances = {
  startID: string;
  endID: string;
  distance: number;
};

export class testingDistance {
  mapNodes: MapNodeType[];
  mapEdges: MapEdgeType[];
  nodesDistances: nodesDistances[];

  public constructor() {
    this.mapNodes = [];
    this.mapEdges = [];
    this.nodesDistances = [];
  }

  async putIntoTypes() {
    this.mapNodes = await client.node.findMany();
    this.mapEdges = await client.edge.findMany();

    for (let i = 0; i < this.mapEdges.length; i++) {
      const startID: string = this.mapEdges[i].startNodeID;
      const endID: string = this.mapEdges[i].endNodeID;

      if (!startID || !endID) return;

      const startCoordinates: { x: number; y: number } | null =
        this.getCoordinates(startID);
      const endCoordinates: { x: number; y: number } | null =
        this.getCoordinates(endID);

      if (!startCoordinates || !endCoordinates) return;

      this.nodesDistances[i] = {
        startID: startID,
        endID: endID,
        distance: this.getDistance(startCoordinates, endCoordinates),
      };
    }

    this.print();
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
