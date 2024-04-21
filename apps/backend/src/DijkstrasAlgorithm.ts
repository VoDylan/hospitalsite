import Algorithms from "./Algorithms.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";
import { Coordinates } from "common/src/Coordinates.ts";

export class DijkstrasAlgorithm extends Algorithms {
  direction: string;

  public constructor() {
    super();
    this.direction = "";
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

  private getDirections(prev: Coordinates, next: Coordinates): string {
    if (prev.x < next.x && Math.abs(prev.y - next.y) < 5) {
      return "right";
    } else if (prev.x > next.x && Math.abs(prev.y - next.y) < 5) {
      return "left";
    } else if (Math.abs(prev.x - next.x) < 5 && prev.y < next.y) {
      return "down";
    } else if (Math.abs(prev.x - next.x) < 5 && prev.y > next.y) {
      return "up";
    } else if (prev.x < next.x && prev.y < next.y) {
      return "right, down";
    } else if (prev.x < next.x && prev.y > next.y) {
      return "right, up";
    } else if (prev.x > next.x && prev.y > next.y) {
      return "left, up";
    } else if (prev.x > next.x && prev.y < next.y) {
      return "left, down";
    }

    return "";
  }

  private getTurnings(prev: Coordinates, next: Coordinates): string {
    if (prev.x < next.x && Math.abs(prev.y - next.y) < 5) {
      return "forward";
    } else if (prev.x > next.x && Math.abs(prev.y - next.y) < 5) {
      return "forward";
    } else if (Math.abs(prev.x - next.x) < 5 && prev.y < next.y) {
      return "right";
    } else if (Math.abs(prev.x - next.x) < 5 && prev.y > next.y) {
      return "up";
    } else if (prev.x < next.x && prev.y < next.y) {
      return "right, down";
    } else if (prev.x < next.x && prev.y > next.y) {
      return "right, up";
    } else if (prev.x > next.x && prev.y > next.y) {
      return "left, up";
    } else if (prev.x > next.x && prev.y < next.y) {
      return "left, down";
    }

    return "";
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
        const coordinatesPath: IDCoordinates[] = [];
        const path: string[] = [];
        const directions: string[] = [];
        let current: string | null = currentNodeID;

        let prev: Coordinates;
        let next: Coordinates;

        // go through the parent list
        while (current !== start) {
          let currentIdx: number = -1;
          let currentCoordinates: Coordinates;

          if (current) {
            path.unshift(current);
            currentCoordinates = this.getCoordinates(current);
            coordinatesPath.unshift({
              nodeID: current,
              coordinates: currentCoordinates,
            });
            currentIdx = this.nodes.findIndex(
              (node) => node.startNodeID === current,
            );
          }
          if (parents[currentIdx] && current) {
            next = this.getCoordinates(parents[currentIdx]!);
            prev = currentCoordinates!;
            directions.unshift(this.getDirections(next, prev));
          }
          current = parents[currentIdx];
        }

        coordinatesPath.unshift({
          nodeID: start,
          coordinates: this.getCoordinates(start),
        });
        path.unshift(start);

        console.log("Path found:", path);
        console.log("Coordinates found:", coordinatesPath);
        console.log("Directions found:", directions);

        return coordinatesPath;
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