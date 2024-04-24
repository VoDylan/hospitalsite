import client from "./bin/database-connection.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import { nodeAlgorithms } from "common/src/nodeAlgorithms.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { Coordinates } from "common/src/Coordinates.ts";

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

  shortestDistance(open: Map<string, number>) {
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

  distance(startNodeID: string, endNodeID: string) {
    const startNodeType = this.mapNodes.find(
      (node) => node.nodeID === startNodeID,
    )!.nodeType;
    const endNodeType = this.mapNodes.find(
      (node) => node.nodeID === endNodeID,
    )!.nodeType;

    if (!startNodeType || !endNodeType) {
      console.error("Could not find start node or end node types");
      return undefined;
    }

    if (startNodeType === "ELEV" && endNodeType === "ELEV") {
      return 20;
    } else if (startNodeType === "STAI" && endNodeType === "STAI") {
      return 100;
    }

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

  getCoordinates(currentNode: string) {
    const Node = this.mapNodes.find((node) => node.nodeID === currentNode);
    if (!Node) {
      console.log("Could not get coordinates");
      return { x: 0, y: 0 };
    }

    return { x: Node.xcoord, y: Node.ycoord };
  }

  /**
   * The function is used to return the directions of the current floor
   * @param typeCoordinates includes the coordinates of the current floor
   * @private
   */
  getTurnings(typeCoordinates: TypeCoordinates[]) {
    const turnsList: string[] = [];

    for (let i = 0; i < typeCoordinates.length; i++) {
      if (typeCoordinates[i + 2]) {
        const firstCoordinate: Coordinates = typeCoordinates[i].coordinates;
        const secondCoordinate: Coordinates =
          typeCoordinates[i + 1].coordinates;
        const thirdCoordinate: Coordinates = typeCoordinates[i + 2].coordinates;

        const firstVector: Coordinates = {
          x: secondCoordinate.x - firstCoordinate.x,
          y: secondCoordinate.y - firstCoordinate.y,
        };
        const secondVector: Coordinates = {
          x: thirdCoordinate.x - secondCoordinate.x,
          y: thirdCoordinate.y - secondCoordinate.y,
        };

        const z =
          firstVector.x * secondVector.y - firstVector.y * secondVector.x;

        const vectorsMultiplication =
          firstVector.x * secondVector.x + firstVector.y * secondVector.y;
        const firstVectorMagnitude = Math.sqrt(
          firstVector.x ** 2 + firstVector.y ** 2,
        );
        const secondVectorMagnitude = Math.sqrt(
          secondVector.x ** 2 + secondVector.y ** 2,
        );
        const angle =
          (Math.acos(
            vectorsMultiplication /
              (firstVectorMagnitude * secondVectorMagnitude),
          ) *
            180) /
          Math.PI;

        if (z > 0 && angle > 10)
          turnsList.push(`Turn right on ${typeCoordinates[i + 1].longName}.`);
        else if (z < 0 && angle > 10)
          turnsList.push(`Turn left on ${typeCoordinates[i + 1].longName}.`);
        else turnsList.push(`Continue on ${typeCoordinates[i + 1].longName}.`);
      }
    }

    return turnsList;
  }

  splitToFloors(typeCoordinates: TypeCoordinates[]) {
    let currentFloorNodes: TypeCoordinates[] = [];
    let turnsList: string[] = [];
    let secondElevator: boolean = false;
    let secondStairs: boolean = false;

    // console.log(typeCoordinates);

    for (let i = 0; i < typeCoordinates.length; i++) {
      currentFloorNodes.push(typeCoordinates[i]);

      if (
        typeCoordinates[i].nodeType === "ELEV" &&
        !secondElevator &&
        typeCoordinates[i].floor !== typeCoordinates[i + 1].floor
      ) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        currentFloorNodes.push(typeCoordinates[i]);
        currentFloorNodes = [];
        turnsList.push(
          `Go to ${typeCoordinates[i].longName} to Floor ${typeCoordinates[i + 1].floor}.`,
        );
        secondElevator = true;
        // console.log("first elevator", newTurnsList);
      } else if (typeCoordinates[i].nodeType === "ELEV" && secondElevator) {
        // const newTurnsList: string[] = this.getTurnings(currentFloorNodes);

        turnsList.push(
          `Come off ${typeCoordinates[i].longName} from Floor ${typeCoordinates[i - 1].floor}.`,
        );
        secondElevator = false;
        // console.log("second elevator", newTurnsList);
      } else if (
        typeCoordinates[i].nodeType === "STAI" &&
        !secondStairs &&
        typeCoordinates[i].floor !== typeCoordinates[i + 1].floor
      ) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        currentFloorNodes.push(typeCoordinates[i]);
        currentFloorNodes = [];
        turnsList.push(
          `Take ${typeCoordinates[i].longName} to Floor ${typeCoordinates[i + 1].floor}.`,
        );
        secondStairs = true;
        // console.log("first stairs", newTurnsList);
      } else if (typeCoordinates[i].nodeType === "STAI" && secondStairs) {
        // const newTurnsList: string[] = this.getTurnings(currentFloorNodes);

        turnsList.push(
          `Come off ${typeCoordinates[i].longName} from Floor ${typeCoordinates[i - 1].floor}.`,
        );
        secondStairs = false;
        // console.log("second stairs", newTurnsList);
      } else if (i === typeCoordinates.length - 1) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        // console.log("last", newTurnsList);
      }
    }

    return turnsList;
  }

  addToTypeCoordinates(
    typeCoordinates: TypeCoordinates[],
    turnsList: string[],
  ) {
    for (let i = 1; i < typeCoordinates.length - 1; i++) {
      typeCoordinates[i].direction = turnsList[i - 1];
    }
    return typeCoordinates;
  }

  ending(currentNodeID: string, start: string, parents: (string | null)[]) {
    const IDCoordinatesPath: IDCoordinates[] = [];
    let TypeCoordinatesPath: TypeCoordinates[] = [];
    const path: string[] = [];
    let current: string | null = currentNodeID;

    // go through the parent list
    while (current !== start) {
      let currentIdx: number = -1;
      let currentCoordinates: Coordinates;

      if (current) {
        path.unshift(current);
        currentCoordinates = this.getCoordinates(current);
        const currentNode = this.mapNodes.find(
          (node) => node.nodeID === current,
        )!;

        TypeCoordinatesPath.unshift({
          nodeID: currentNode.nodeID,
          nodeType: currentNode.nodeType,
          floor: currentNode.floor,
          longName: currentNode.longName,
          coordinates: currentCoordinates,
          direction: "",
        });
        IDCoordinatesPath.unshift({
          nodeID: current,
          coordinates: currentCoordinates,
        });
        currentIdx = this.nodes.findIndex(
          (node) => node.startNodeID === current,
        );
      }
      current = parents[currentIdx];
    }

    IDCoordinatesPath.unshift({
      nodeID: start,
      coordinates: this.getCoordinates(start),
    });

    const startNode = this.mapNodes.find((node) => node.nodeID === start)!;
    TypeCoordinatesPath.unshift({
      nodeID: startNode.nodeID,
      nodeType: startNode.nodeType,
      floor: startNode.floor,
      longName: startNode.longName,
      coordinates: this.getCoordinates(start),
      direction: "",
    });
    path.unshift(start);

    const turnsPath = this.splitToFloors(TypeCoordinatesPath);
    console.log(
      "turns path",
      turnsPath.length,
      "actual path",
      TypeCoordinatesPath.length,
    );
    TypeCoordinatesPath = this.addToTypeCoordinates(
      TypeCoordinatesPath,
      turnsPath,
    );

    // console.log("Path found:", path);
    // console.log("Coordinates found:", IDCoordinatesPath);
    // console.log("Turns found", turnsPath);

    console.log("Everything: ", TypeCoordinatesPath);

    return TypeCoordinatesPath;
  }

  abstract runAlgorithm(start: string, end: string): TypeCoordinates[];
}

export default Algorithms;
