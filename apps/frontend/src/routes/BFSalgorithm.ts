import * as fs from "fs";
import * as readline from "readline";

type Node = {
  current_node: string;
  neighbors: string[];
  x_coordinate: number;
  y_coordinate: number;
  index: number;
};

let edges: string[][] = [];
// let nodes = [];
const all_nodes: Node[] = [];
let count: number = 0;

export class BFSalgorithm {
  // type should have starting node ID and coordinate

  // start_node: Node;
  // end_node: Node;

  public constructor() {
    // this.start_node = start_node;
    // this.end_node = end_node;
  }

  private parseCSV() {
    edges = fs
      .readFileSync("../csv/L1Edges.csv", {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.trim().split(",");
      });

    // nodes = fs.readFileSync("../csv/L1Nodes.csv", {
    //     encoding: "utf-8"
    // })
    //     .split("\n")
    //     .map((row: string): string[] => {
    //         return row.trim().split(",");
    //     });
  }

  /**
   * Checking if the node already exists in all nodes
   * @param to_check the node to check
   */
  check_node(to_check: Node) {
    for (let i = 0; i < all_nodes.length; i++) {
      if (all_nodes[i].current_node === to_check.current_node) return true;
    }

    return false;
  }

  /**
   * Adding neighbor node to each node (meaning the nodes a node goes directly to)
   * @param to_check check if this node has a neighbor
   * @param neighbor_now current node to be added
   */
  add_neighbor(to_check: Node, neighbor_now: string) {
    for (let i = 0; i < all_nodes.length; i++) {
      if (all_nodes[i].current_node === to_check.current_node)
        all_nodes[i].neighbors.push(neighbor_now);
    }
  }

  add_to_all_nodes() {
    for (let i = 1; i < edges.length - 1; i++) {
      const start_node_now: Node = {
        current_node: edges[i][0],
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };
      const end_neighbor_now: Node = {
        current_node: edges[i][1],
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };

      if (!this.check_node(start_node_now)) {
        start_node_now.index = count;
        all_nodes.push(start_node_now);
        count++;
      }

      if (!this.check_node(end_neighbor_now)) {
        end_neighbor_now.index = count;
        all_nodes.push(end_neighbor_now);
        count++;
      }

      this.add_neighbor(start_node_now, end_neighbor_now.current_node);
      this.add_neighbor(end_neighbor_now, start_node_now.current_node);
    }
  }

  /**
   * Implementation of Breadth-first search algorithm to find the shortest path from starting to end nodes
   * @param start the starting node as a string
   * @param end the ending node as a string
   */
  BFS(start: string, end: string) {
    let start_node: Node = {
      current_node: start,
      neighbors: [],
      x_coordinate: 0,
      y_coordinate: 0,
      index: -1,
    };
    let end_node: Node = {
      current_node: end,
      neighbors: [],
      x_coordinate: 0,
      y_coordinate: 0,
      index: -1,
    };

    for (let i = 0; i < all_nodes.length; i++) {
      if (start === all_nodes[i].current_node) start_node = all_nodes[i];

      if (end === all_nodes[i].current_node) end_node = all_nodes[i];
    }

    const queue: Node[] = [];
    const parentsMap: Map<string, Node[]> = new Map(); // Map to store parent nodes for each node
    const visited: boolean[] = new Array(all_nodes.length).fill(false);

    visited[start_node.index] = true;
    queue.push(start_node);

    while (queue.length !== 0) {
      const current_node = queue.shift();

      if (current_node) {
        if (current_node === end_node) {
          // backtrack from end node to start node
          const path: string[] = []; // array to store the shortest path
          let current = end_node; // initialize to be the starting node
          while (current !== start_node) {
            // loop to check if the current node is the starting node
            path.unshift(current.current_node); // adds the current node to the beginning of the path
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
          console.log(path.join(" -> "));
          return;
        }

        for (let i = 0; i < current_node.neighbors.length; i++) {
          const neighbor_index = all_nodes.findIndex(
            (node) => node.current_node === current_node.neighbors[i],
          );
          if (neighbor_index !== -1 && !visited[neighbor_index]) {
            visited[neighbor_index] = true;
            queue.push(all_nodes[neighbor_index]);

            // lines below help to add this current node as the parent of all neighboring nodes
            const parents = parentsMap.get(current_node.neighbors[i]) || []; // gets the current parents for the node
            parents.push(current_node); // adds a parent to the node
            parentsMap.set(current_node.neighbors[i], parents); // sets the neighbor parents to updated parents
          }
        }
      }
    }

    console.log("End node not reachable from the start node.");
  }

  setup() {
    this.parseCSV();
    this.add_to_all_nodes();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Starting node: ", (start_node: string) => {
      rl.question("Ending node: ", (end_node: string) => {
        this.BFS(start_node, end_node);

        rl.close(); // Close the interface after all questions are answered
      });
    });
  }
}
