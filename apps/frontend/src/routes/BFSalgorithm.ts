// import * as fs from "fs";

type Node = {
  current_node: string;
  neighbors: string[];
  x_coordinate: number;
  y_coordinate: number;
  index: number;
};

type Coordinates = {
  x: number;
  y: number;
};

const edges: string[][] = [
  ["startNodeID", "endNodeID"],
  ["CCONF002L1", "WELEV00HL1"],
  ["CCONF003L1", "CHALL002L1"],
  ["CDEPT002L1", "CDEPT003L1"],
  ["CDEPT003L1", "CHALL014L1"],
  ["CDEPT004L1", "CHALL002L1"],
  ["CHALL001L1", "CREST001L1"],
  ["CHALL002L1", "CSERV001L1"],
  ["CHALL003L1", "CCONF003L1"],
  ["CHALL003L1", "CLABS004L1"],
  ["CHALL004L1", "CREST004L1"],
  ["CHALL005L1", "WELEV00ML1"],
  ["CHALL006L1", "CHALL007L1"],
  ["CHALL007L1", "CHALL008L1"],
  ["CHALL008L1", "CDEPT004L1"],
  ["CHALL008L1", "WELEV00KL1"],
  ["CHALL009L1", "CHALL010L1"],
  ["CHALL009L1", "CRETL001L1"],
  ["CHALL010L1", "CREST003L1"],
  ["CHALL011L1", "WELEV00JL1"],
  ["CHALL012L1", "CHALL013L1"],
  ["CHALL013L1", "CDEPT002L1"],
  ["CHALL014L1", "WELEV00LL1"],
  ["CHALL015L1", "CCONF001L1"],
  ["CHALL015L1", "CHALL011L1"],
  ["CLABS001L1", "CREST002L1"],
  ["CLABS002L1", "CHALL005L1"],
  ["CLABS002L1", "CREST001L1"],
  ["CLABS003L1", "CHALL006L1"],
  ["CLABS004L1", "CLABS003L1"],
  ["CLABS005L1", "CHALL003L1"],
  ["CREST002L1", "CHALL006L1"],
  ["CREST003L1", "CHALL015L1"],
  ["CREST004L1", "CLABS005L1"],
  ["CRETL001L1", "CHALL012L1"],
  ["CSERV001L1", "CCONF002L1"],
  ["WELEV00HL1", "CHALL004L1"],
  ["WELEV00KL1", "CHALL009L1"],
  ["WELEV00LL1", "CHALL001L1"],
  ["WELEV00ML1", "CLABS001L1"],
  ["GEXIT001L1", "GHALL002L1"],
  ["GHALL002L1", "GHALL003L1"],
  ["GHALL003L1", "GHALL004L1"],
  ["GHALL003L1", "GHALL005L1"],
  ["GHALL005L1", "GSTAI008L1"],
  ["GHALL005L1", "GHALL006L1"],
  ["GHALL006L1", "GELEV00QL1"],
  [""],
];

const nodes: string[][] = [
  [
    "nodeID",
    "xcoord",
    "ycoord",
    "floor",
    "building",
    "nodeType",
    "longName",
    "shortName",
  ],
  [
    "CCONF001L1",
    "2255",
    "849",
    "L1",
    "45 Francis",
    "CONF",
    "Anesthesia Conf Floor L1",
    "Conf C001L1",
  ],
  [
    "CCONF002L1",
    "2665",
    "1043",
    "L1",
    "45 Francis",
    "CONF",
    "Medical Records Conference Room Floor L1",
    "Conf C002L1",
  ],
  [
    "CCONF003L1",
    "2445",
    "1245",
    "L1",
    "45 Francis",
    "CONF",
    "Abrams Conference Room",
    "Conf C003L1",
  ],
  [
    "CDEPT002L1",
    "1980",
    "844",
    "L1",
    "Tower",
    "DEPT",
    "Day Surgery Family Waiting Floor L1",
    "Department C002L1",
  ],
  [
    "CDEPT003L1",
    "1845",
    "844",
    "L1",
    "Tower",
    "DEPT",
    "Day Surgery Family Waiting Exit Floor L1",
    "Department C003L1",
  ],
  [
    "CDEPT004L1",
    "2310",
    "1043",
    "L1",
    "45 Francis",
    "DEPT",
    "Medical Records Film Library Floor L1",
    "Department C004L1",
  ],
  [
    "CHALL001L1",
    "1732",
    "924",
    "L1",
    "Tower",
    "HALL",
    "Hallway 1 Floor L1",
    "Hallway C001L1",
  ],
  [
    "CHALL002L1",
    "2445",
    "1043",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 2 Floor L1",
    "Hallway C002L1",
  ],
  [
    "CHALL003L1",
    "2445",
    "1284",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 3 Floor L1",
    "Hallway C003L1",
  ],
  [
    "CHALL004L1",
    "2770",
    "1070",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 4 Floor L1",
    "Hallway C004L1",
  ],
  [
    "CHALL005L1",
    "1750",
    "1284",
    "L1",
    "Tower",
    "HALL",
    "Hallway 5 Floor L1",
    "Hallway C005L1",
  ],
  [
    "CHALL006L1",
    "2130",
    "1284",
    "L1",
    "Tower",
    "HALL",
    "Hallway 6 Floor L1",
    "Hallway C006L1",
  ],
  [
    "CHALL007L1",
    "2130",
    "1045",
    "L1",
    "Tower",
    "HALL",
    "Hallway 7 Floor L1",
    "Hallway C007L1",
  ],
  [
    "CHALL008L1",
    "2215",
    "1045",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 8 Floor L1",
    "Hallway C008L1",
  ],
  [
    "CHALL009L1",
    "2220",
    "904",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 9 Floor L1",
    "Hallway C009L1",
  ],
  [
    "CHALL010L1",
    "2265",
    "904",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 10 Floor L1",
    "Hallway C010L1",
  ],
  [
    "CHALL011L1",
    "2360",
    "849",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 11 Floor L1",
    "Hallway C011L1",
  ],
  [
    "CHALL012L1",
    "2130",
    "904",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 12 Floor L1",
    "Hallway C012L1",
  ],
  [
    "CHALL013L1",
    "2130",
    "844",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 13 Floor L1",
    "Hallway C013L1",
  ],
  [
    "CHALL014L1",
    "1845",
    "924",
    "L1",
    "Tower",
    "HALL",
    "Hallway 14 Floor L1",
    "Hallway C014L1",
  ],
  [
    "CHALL015L1",
    "2300",
    "849",
    "L1",
    "45 Francis",
    "HALL",
    "Hallway 15 Floor L1",
    "Hallway C015L1",
  ],
  [
    "CLABS001L1",
    "1965",
    "1284",
    "L1",
    "Tower",
    "LABS",
    "Outpatient Fluoroscopy Floor L1",
    "Lab C001L1",
  ],
  [
    "CLABS002L1",
    "1750",
    "1090",
    "L1",
    "Tower",
    "LABS",
    "Pre-Op PACU Floor L1",
    "Lab C002L1",
  ],
  [
    "CLABS003L1",
    "2290",
    "1284",
    "L1",
    "45 Francis",
    "LABS",
    "Nuclear Medicine Floor L1",
    "Lab C003L1",
  ],
  [
    "CLABS004L1",
    "2320",
    "1284",
    "L1",
    "45 Francis",
    "LABS",
    "Ultrasound Floor L1",
    "Lab C004L1",
  ],
  [
    "CLABS005L1",
    "2770",
    "1284",
    "L1",
    "45 Francis",
    "LABS",
    "CSIR MRI Floor L1",
    "Lab C005L1",
  ],
  [
    "CREST001L1",
    "1732",
    "1019",
    "L1",
    "Tower",
    "REST",
    "Restroom L Elevator Floor L1",
    "Restroom C001L1",
  ],
  [
    "CREST002L1",
    "2065",
    "1284",
    "L1",
    "Tower",
    "REST",
    "Restroom M Elevator Floor L1",
    "Restroom C002L1",
  ],
  [
    "CREST003L1",
    "2300",
    "879",
    "L1",
    "45 Francis",
    "REST",
    "Restroom K Elevator Floor L1",
    "Restroom C003L1",
  ],
  [
    "CREST004L1",
    "2770",
    "1160",
    "L1",
    "45 Francis",
    "REST",
    "Restroom H Elevator Floor L1",
    "Restroom C004L1",
  ],
  [
    "CRETL001L1",
    "2185",
    "904",
    "L1",
    "45 Francis",
    "RETL",
    "Vending Machine 1 L1",
    "Retail C001L1",
  ],
  [
    "CSERV001L1",
    "2490",
    "1043",
    "L1",
    "45 Francis",
    "SERV",
    "Volunteers Floor L1",
    "Service C001L1",
  ],
  [
    "CSERV001L2",
    "2015",
    "1280",
    "L2",
    "45 Francis",
    "SERV",
    "Interpreter Services Floor L2",
    "Service C001L2",
  ],
  [
    "GELEV00QL1",
    "1637",
    "2116",
    "L1",
    "Shapiro",
    "ELEV",
    "Elevator Q MapNode 7 Floor L1",
    "Elevator Q L1",
  ],
  [
    "GEXIT001L1",
    "1702",
    "2260",
    "L1",
    "Shapiro",
    "EXIT",
    "Fenwood Road Exit MapNode 1 Floor L1",
    "Fenwood Road EntranceExit L1",
  ],
  [
    "GHALL002L1",
    "1702",
    "2167",
    "L1",
    "Shapiro",
    "HALL",
    "Hallway MapNode 2 Floor L1",
    "Hall",
  ],
  [
    "GHALL003L1",
    "1688",
    "2167",
    "L1",
    "Shapiro",
    "HALL",
    "Hallway MapNode 3 Floor L1",
    "Hall",
  ],
  [
    "GHALL004L1",
    "1666",
    "2167",
    "L1",
    "Shapiro",
    "HALL",
    "Hallway MapNode 4 Floor L1",
    "Hall",
  ],
  [
    "GHALL005L1",
    "1688",
    "2131",
    "L1",
    "Shapiro",
    "HALL",
    "Hallway MapNode 5 Floor L1",
    "Hall",
  ],
  [
    "GHALL006L1",
    "1665",
    "2116",
    "L1",
    "Shapiro",
    "HALL",
    "Hallway MapNode 6 Floor L1",
    "Hall",
  ],
  [
    "GSTAI008L1",
    "1720",
    "2131",
    "L1",
    "Shapiro",
    "STAI",
    "Stairs MapNode 8 Floor L1",
    "L1 Stairs",
  ],
  [
    "WELEV00HL1",
    "2715",
    "1070",
    "L1",
    "45 Francis",
    "ELEV",
    "Elevator H Floor L1",
    "Elevator HL1",
  ],
  [
    "WELEV00JL1",
    "2360",
    "799",
    "L1",
    "45 Francis",
    "ELEV",
    "Elevator J Floor L1",
    "Elevator JL1",
  ],
  [
    "WELEV00KL1",
    "2220",
    "974",
    "L1",
    "45 Francis",
    "ELEV",
    "Elevator K Floor L1",
    "Elevator KL1",
  ],
  [
    "WELEV00LL1",
    "1785",
    "924",
    "L1",
    "Tower",
    "ELEV",
    "Elevator L Floor L1",
    "Elevator LL1",
  ],
  [
    "WELEV00ML1",
    "1820",
    "1284",
    "L1",
    "Tower",
    "ELEV",
    "Elevator M Floor L1",
    "Elevator ML1",
  ],
  [""],
];
const all_nodes: Node[] = [];
let count: number = 0;

export class BFSalgorithm {
  // type should have starting node ID and coordinate

  start_node: string;
  end_node: string;

  public constructor(start_node: string, end_node: string) {
    this.start_node = start_node;
    this.end_node = end_node;
  }

  // private parseCSV() {
  //   edges = fs
  //     .readFileSync("../csv/L1Edges.csv", {
  //       encoding: "utf-8",
  //     })
  //     .split("\n")
  //     .map((row: string): string[] => {
  //       return row.trim().split(",");
  //     });
  //
  //   nodes = fs
  //     .readFileSync("../csv/L1Nodes.csv", {
  //       encoding: "utf-8",
  //     })
  //     .split("\n")
  //     .map((row: string): string[] => {
  //       return row.trim().split(",");
  //     });
  // }

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

  add_coordinates(node: Node) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i][0] === node.current_node) {
        node.x_coordinate = Number(nodes[i][1]);
        node.y_coordinate = Number(nodes[i][2]);
      }
    }
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
    if (!edges) {
      // console.error("Edges array is undefined or empty");
      return;
    }

    for (let i = 1; i < edges.length - 1; i++) {
      const start_node_now: Node = {
        current_node: edges[i][0],
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };

      // if (edges[i][1] === undefined) continue;

      const end_neighbor_now: Node = {
        current_node: edges[i][1],
        neighbors: [],
        x_coordinate: 0,
        y_coordinate: 0,
        index: -1,
      };

      this.add_coordinates(start_node_now);
      this.add_coordinates(end_neighbor_now);

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
   * Implementation of Breadth-first search algorithm to find the shortest path from start to end nodes
   * @param start the starting node as a string
   * @param end the ending node as a string
   */
  BFS(start: string, end: string) {
    const start_node = all_nodes.find((node) => node.current_node === start);
    const end_node = all_nodes.find((node) => node.current_node === end);

    // Check if start and end nodes are found
    if (!start_node || !end_node) {
      console.error("Start or end node not found.");
      return null;
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
    return null;
  }

  setup() {
    // this.parseCSV();
    this.add_to_all_nodes();
    return this.BFS(this.start_node, this.end_node);
    // return this.BFS("CCONF002L1", "CHALL009L1");
  }
}
