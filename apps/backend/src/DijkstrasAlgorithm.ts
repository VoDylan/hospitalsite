import Algorithms from "./Algorithms.ts";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

export class DijkstrasAlgorithm extends Algorithms {
  public constructor() {
    super();
  }

  async loadData() {
    await super.loadData();
  }

  runAlgorithm(start: string, end: string): TypeCoordinates[] {
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
      const currentNodeID = this.shortestDistance(queue);

      if (currentNodeID === end) {
        return this.ending(currentNodeID, start, parents);
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
