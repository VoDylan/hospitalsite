// import * as fs from "fs";
import { Edge } from "common/src/Edge.ts";
import { Node } from "common/src/Node.ts";

import { NodeBFS } from "common/src/NodeBFS.ts";
import { Coordinates } from "common/src/Coordinates.ts";
import { client } from "./PrismaScripts.ts";
export class BFSalgorithm {
  all_nodes: NodeBFS[];
  count: number;
  // type should have starting NodeBFS ID and coordinate

  public constructor() {
    this.all_nodes = [];
    this.count = 0;
  }

  // load nodes and edges
  async load_data() {
    const edges: Edge[] = await client.edge.findMany();
    const nodes: Node[] = await client.node.findMany();

    if (!edges) {
      // console.error("Edges array is undefined or empty");
      return;
    }
    if (!nodes) {
      // console.error("Edges array is undefined or empty");
      return;
    }

    for (let i = 1; i < edges.length - 1; i++) {
      const start_node_now: NodeBFS = {
        current_node: edges[i].startNodeID,
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };

      // if (edges[i][1] === undefined) continue;

      const end_neighbor_now: NodeBFS = {
        current_node: edges[i].endNodeID,
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };

      // this.add_coordinates(start_node_now);
      // this.add_coordinates(end_neighbor_now);

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeID === start_node_now.current_node) {
          start_node_now.x_coordinate = Number(nodes[i].xcoord);
          start_node_now.y_coordinate = Number(nodes[i].ycoord);
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeID === end_neighbor_now.current_node) {
          end_neighbor_now.x_coordinate = Number(nodes[i].xcoord);
          end_neighbor_now.y_coordinate = Number(nodes[i].ycoord);
        }
      }

      if (!this.check_node(start_node_now)) {
        start_node_now.index = this.count;
        this.all_nodes.push(start_node_now);
        this.count++;
      }

      if (!this.check_node(end_neighbor_now)) {
        end_neighbor_now.index = this.count;
        this.all_nodes.push(end_neighbor_now);
        this.count++;
      }

      // this.add_neighbor(start_node_now, );
      for (let i = 0; i < this.all_nodes.length; i++) {
        if (this.all_nodes[i].current_node === start_node_now.current_node)
          this.all_nodes[i].neighbors.push(end_neighbor_now.current_node);
      }
      // this.add_neighbor(end_neighbor_now, start_node_now.current_node);
      for (let i = 0; i < this.all_nodes.length; i++) {
        if (this.all_nodes[i].current_node === end_neighbor_now.current_node)
          this.all_nodes[i].neighbors.push(start_node_now.current_node);
      }
    }
  }

  /**
   * Checking if the NodeBFS already exists in all nodes
   * @param to_check the NodeBFS to check
   */
  check_node(to_check: NodeBFS) {
    for (let i = 0; i < this.all_nodes.length; i++) {
      if (this.all_nodes[i].current_node === to_check.current_node) return true;
    }

    return false;
  }

  // add_coordinates(node: NodeBFS) {
  //
  // }

  /**
   * Adding neighbor node to each node (meaning the nodes a node goes directly to)
   * @param to_check check if this node has a neighbor
   * @param neighbor_now current node to be added
   */
  // add_neighbor(to_check: NodeBFS, neighbor_now: string) {
  //   for (let i = 0; i < this.all_nodes.length; i++) {
  //     if (this.all_nodes[i].current_node === to_check.current_node)
  //         this.all_nodes[i].neighbors.push(neighbor_now);
  //   }
  // }

  // add_to_all_nodes() {
  //
  // }

  /**
   * Implementation of Breadth-first search algorithm to find the shortest path from start to end nodes
   * @param start the starting node as a string
   * @param end the ending node as a string
   */
  BFS(start: string, end: string) {
    const start_node = this.all_nodes.find(
      (node) => node.current_node === start,
    );
    const end_node = this.all_nodes.find((node) => node.current_node === end);

    // Check if start and end nodes are found
    if (!start_node || !end_node) {
      console.error("Start or end node not found.");
      return null;
    }

    const queue: NodeBFS[] = [];
    const parentsMap: Map<string, NodeBFS[]> = new Map(); // Map to store parent nodes for each node
    const visited: boolean[] = new Array(this.all_nodes.length).fill(false);

    visited[start_node.index] = true;
    queue.push(start_node);

    while (queue.length !== 0) {
      const current_node = queue.shift();

      if (current_node) {
        if (current_node === end_node) {
          // backtrack from end node to start node
          const path: string[] = []; // array to store the shortest path
          const coordinate_path: Coordinates[] = [];
          let current = end_node; // initialize to be the starting node
          while (current !== start_node) {
            // loop to check if the current node is the starting node
            path.unshift(current.current_node); // adds the current node to the beginning of the path
            coordinate_path.unshift({
              x: current.x_coordinate,
              y: current.y_coordinate,
            });

            const parents = parentsMap.get(current.current_node);
            if (parents && parents.length > 0)
              current = parents[0]; // choose the first parent because of BFS algorithm
            else {
              console.error(
                "Error: Parent not found for node",
                current.current_node,
              );
              return;
            }
          }
          path.unshift(start_node.current_node); // adds the first node to index 0
          coordinate_path.unshift({
            x: start_node.x_coordinate,
            y: start_node.y_coordinate,
          });
          console.log(path.join(" -> "));
          return coordinate_path;
        }

        for (let i = 0; i < current_node.neighbors.length; i++) {
          const neighbor_index = this.all_nodes.findIndex(
            (node) => node.current_node === current_node.neighbors[i],
          );
          if (neighbor_index !== -1 && !visited[neighbor_index]) {
            visited[neighbor_index] = true;
            queue.push(this.all_nodes[neighbor_index]);

            // lines below help to add this current node as the parent of all neighboring nodes
            const parents = parentsMap.get(current_node.neighbors[i]) || []; // gets the current parents for the node
            parents.push(current_node); // adds a parent to the node
            parentsMap.set(current_node.neighbors[i], parents); // sets the neighbor parents to updated parents
          }
        }
      }
    }

    return null;
  }
}
