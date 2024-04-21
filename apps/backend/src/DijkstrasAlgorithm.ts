import Algorithms from "./Algorithms.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { Coordinates } from "common/src/Coordinates.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class DijkstrasAlgorithm extends Algorithms {
  public constructor() {
    super();
  }

  async loadData() {
    await super.loadData();
  }

  private getKeyWithLowestDistance(map: Map<string, number>): string {
    let lowestKey = "";
    let lowestDistance = Infinity;

    for (const [key, value] of map.entries()) {
      if (lowestDistance > value) {
        lowestKey = key;
        lowestDistance = value;
      }
    }

    return lowestKey;
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

  /**
   * The function is used to return the directions of the current floor
   * @param typeCoordinates includes the coordinates of the current floor
   * @private
   */
  private getTurnings(typeCoordinates: TypeCoordinates[]) {
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

        if (z > 0 && angle > 10) turnsList.push("right");
        else if (z < 0 && angle > 10) turnsList.push("left");
        else turnsList.push("forward");
      }
    }

    return turnsList;
  }

  private splitToFloors(typeCoordinates: TypeCoordinates[]) {
    let currentFloorNodes: TypeCoordinates[] = [];
    let turnsList: string[] = [];
    let secondElevator: boolean = false;
    let secondStairs: boolean = false;

    // console.log(typeCoordinates);

    for (let i = 0; i < typeCoordinates.length; i++) {
      currentFloorNodes.push(typeCoordinates[i]);

      if (typeCoordinates[i].nodeType === "ELEV" && !secondElevator) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        currentFloorNodes.push(typeCoordinates[i]);
        currentFloorNodes = [];
        turnsList.push(`elevator to ${typeCoordinates[i + 1].floor}`);
        secondElevator = true;
        console.log("first elevator", newTurnsList);
      } else if (typeCoordinates[i].nodeType === "ELEV" && secondElevator) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);

        turnsList.push(`elevator from ${typeCoordinates[i - 1].floor}`);
        secondElevator = false;
        console.log("second elevator", newTurnsList);
      } else if (typeCoordinates[i].nodeType === "STAI" && !secondStairs) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        currentFloorNodes.push(typeCoordinates[i]);
        currentFloorNodes = [];
        turnsList.push(`stairs to ${typeCoordinates[i + 1].floor}`);
        secondStairs = true;
        console.log("first stairs", newTurnsList);
      } else if (typeCoordinates[i].nodeType === "STAI" && secondStairs) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);

        turnsList.push(`stairs from ${typeCoordinates[i - 1].floor}`);
        secondStairs = false;
        console.log("second stairs", newTurnsList);
      } else if (i === typeCoordinates.length - 1) {
        const newTurnsList: string[] = this.getTurnings(currentFloorNodes);
        turnsList = [...turnsList, ...newTurnsList];

        console.log("last", newTurnsList);
      }
    }

    return turnsList;
  }

  runAlgorithm(start: string, end: string): IDCoordinates[] {
    /**
     * PSEUDOCODE
     *
     * distance with number array
     * prev with string array
     * for each value in nodes set distance as infinity and prev as undefined, add each node to q
     * set distance as start as 0
     *
     * create a queue that is a map with string and distance
     * while queue is not empty
     *  set u as string with the name of the node with the lowest distance
     *  remove u from the queue
     *
     *  for each neighbor of u
     *    if neighbor is in the queue
     *      set alternative as the dist[u] + the actual distance between u and neighbor
     *      if alternative distance is less that the distance of the neighbor
     *        distance of neighbor is alternative
     *        previous is u
     */

    const dist: number[] = [];
    const prev: string[] | undefined[] = [];

    const parents: (string | null)[] = [];

    const queue = new Map<string, number>();

    for (let i = 0; i < this.nodes.length; i++) {
      dist[i] = Infinity;
      prev[i] = undefined;

      queue.set(this.nodes[i].startNodeID, Infinity);
    }

    const startIDIndex = this.nodes.findIndex(
      (node) => node.startNodeID === start,
    );
    dist[startIDIndex] = 0;
    queue.set(start, 0);
    parents[startIDIndex] = null;

    console.log(queue.get(start));

    while (queue.size > 0) {
      const currentNodeID = this.getKeyWithLowestDistance(queue);

      if (currentNodeID === end) {
        const IDCoordinatesPath: IDCoordinates[] = [];
        const TypeCoordinatesPath: TypeCoordinates[] = [];
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
              nodeType: currentNode.nodeType,
              floor: currentNode.floor,
              coordinates: currentCoordinates,
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
          nodeType: startNode.nodeType,
          floor: startNode.floor,
          coordinates: this.getCoordinates(start),
        });
        path.unshift(start);

        const turnsPath = this.splitToFloors(TypeCoordinatesPath);

        console.log("Path found:", path);
        console.log("Coordinates found:", IDCoordinatesPath);
        console.log("Turns found", turnsPath);

        return IDCoordinatesPath;
      }

      const currentNode = this.nodes.find(
        (node) => node.startNodeID === currentNodeID,
      );

      for (let i = 0; i < currentNode!.neighbors.length; i++) {
        const neighborNodeID = currentNode!.neighbors[i];
        const neighborNodeIndex = this.nodes.findIndex(
          (node) => node.startNodeID === neighborNodeID,
        );

        if (queue.has(neighborNodeID)) {
          const alt: number =
            queue.get(currentNodeID)! +
            this.distance(currentNodeID, neighborNodeID);

          if (alt < queue.get(neighborNodeID)!) {
            queue.set(neighborNodeID, alt);
            prev[neighborNodeIndex] = currentNodeID;
            parents[neighborNodeIndex] = currentNodeID;
          }
        }
      }

      queue.delete(currentNodeID);
    }

    return [];
  }
}
