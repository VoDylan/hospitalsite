import CSVTools from "./lib/CSVTools";
import {
  clearDBEdges,
  clearDBNodes,
  getDBNodes,
  getDBEdges,
  clearDBRequests,
  createNodePrisma,
  createEdgePrisma,
} from "./PrismaScripts";
//import client from "./bin/database-connection.ts";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";

export default class DBManager {
  private static instance: DBManager;

  //Default export directory to be used when saving nodes and edges to a CSV file
  private exportDir: string = "./apps/backend/output/";

  private loggingPrefix: string = "DBManager: ";

  private nodesLastUpdated: Date | null = null;

  /**
   * Private constructor for use in creating the singleton DBManager instance
   * @private
   */
  private constructor() {
    console.log(`${this.loggingPrefix}Created DBManager singleton instance`);
  }

  /**
   * Function to return the existing singleton instance for the DBManager class or create the singleton instance
   */
  public static getInstance(): DBManager {
    if (!this.instance) {
      this.instance = new DBManager();
    }

    return this.instance;
  }

  /**
   * Public helper function to import both nodes and edges from individual file paths
   * @param pathNode - Filepath for the node CSV data
   * @param pathEdge - Filepath for the edge CSV data
   */
  public async importNodesAndEdges(pathNode: string, pathEdge: string) {
    //Clear both the edges and the nodes tables
    await clearDBRequests();
    await clearDBEdges();
    await clearDBNodes();

    await this.importNodesFromPath(pathNode);
    await this.importEdgesFromPath(pathEdge);
  }

  /**
   * Function to import Nodes from a file path into the object list and database
   * @param nodePath - Filepath for the node CSV data
   * @private
   */
  private async importNodesFromPath(nodePath: string) {
    //Convert file data to individual elements in a 2d array. Rows represent an individual node and the columns represent the data elements
    const nodes: string[][] = CSVTools.parseCSVFromFile(nodePath);

    //Loop through all nodes, skipping the header row
    for (let i: number = 1; i < nodes.length; i++) {
      if (nodes[i][0] == "") continue;
      //Create a NodeFields object to store all node information in an easy-to-transport object
      const nodeInfo: MapNodeType = {
        nodeID: nodes[i][0],
        xcoord: parseInt(nodes[i][1]),
        ycoord: parseInt(nodes[i][2]),
        floor: nodes[i][3],
        building: nodes[i][4],
        nodeType: nodes[i][5],
        longName: nodes[i][6],
        shortName: nodes[i][7],
      };

      await createNodePrisma(nodeInfo);
    }
  }

  /**
   * Function to import Edges from a file path into the object list and database
   * @param edgePath - Filepath for the edge CSV data
   * @private
   */
  private async importEdgesFromPath(edgePath: string) {
    //Convert file data to individual elements in a 2d array. Rows represent an individual edge and the columns represent the data elements
    const edges: string[][] = CSVTools.parseCSVFromFile(edgePath);

    //loop through all edges, skipping the header line
    for (let i: number = 1; i < edges.length; i++) {
      if (edges[i][0] == "") continue;
      const edgeInfo: MapEdgeType = {
        edgeID: edges[i][0],
        startNodeID: edges[i][1],
        endNodeID: edges[i][2],
      };

      await createEdgePrisma(edgeInfo);
    }
  }

  // /**
  //  * Function to export the list of nodes and edges to a CSV file
  //  */
  // public exportNodesAndEdgesToCSV() {
  //   const exportNodesFileName: string = "nodes.csv";
  //   const exportEdgesFileName: string = "edges.csv";
  //
  //   //Check if the export directory already exists and create it if not
  //   if (!fs.existsSync(this.exportDir)) {
  //     fs.mkdirSync(this.exportDir);
  //   }
  //   //Open a new CSV file to write the node information to and write the CSV header to the file
  //   fs.writeFileSync(
  //     this.getCombinedFilepath(exportNodesFileName),
  //     MapNode.csvHeader + "\n",
  //     { encoding: "utf8", flag: "w" },
  //   );
  //
  //   //Loop through all mapNodes and append their information in CSV format to the previously opened node CSV file
  //   for (let i = 0; i < GraphManager.getInstance().nodes.length; i++) {
  //     const data = GraphManager.getInstance().nodes[i].toCSV();
  //     fs.appendFileSync(
  //       this.getCombinedFilepath(exportNodesFileName),
  //       data + (i != GraphManager.getInstance().nodes.length - 1 ? "\n" : ""),
  //       { encoding: "utf8", flag: "a" },
  //     );
  //   }
  //
  //   //Open a new CSV file to write the edge information to and write the CSV header to the file
  //   fs.writeFileSync(
  //     this.getCombinedFilepath(exportEdgesFileName),
  //     MapEdge.csvHeader + "\n",
  //     { encoding: "utf8", flag: "w" },
  //   );
  //
  //   //Loop through all mapEdges and append their information in CSV format to the previously opened edge CSV file
  //   for (let i = 0; i < GraphManager.getInstance().edges.length; i++) {
  //     const data = GraphManager.getInstance().edges[i].toCSV();
  //     fs.appendFileSync(
  //       this.getCombinedFilepath(exportEdgesFileName),
  //       data + (i != GraphManager.getInstance().nodes.length - 1 ? "\n" : ""),
  //       { encoding: "utf8", flag: "a" },
  //     );
  //   }
  // }

  /**
   * Helper function to print the nodes in string format
   */
  public async printNodes() {
    const nodes: MapNodeType[] | null = await getDBNodes();

    if (!nodes) return;

    let prints: string = "";
    for (let i = 0; i < nodes.length; i++) {
      prints = prints + nodes[i].toString();
    }
    console.log(`${this.loggingPrefix}\n${prints}`);
  }

  /**
   * Helper function to print the edges in string format
   */
  public async printEdges() {
    const edges: MapEdgeType[] | null = await getDBEdges();

    if (!edges) return;

    let prints: string = "";
    for (let i = 0; i < edges.length; i++) {
      prints = prints + edges[i].toString();
    }
    console.log(`${this.loggingPrefix}${prints}`);
  }

  public async updateNodesAndEdgesFromDB() {
    await this.getNodesFromDB();
    await this.updateAndGetEdgesFromDB();
  }

  /**
   * Function to query database for all nodes and places them in this object's array
   * Call this then get mapNodes
   */

  public async getNodesFromDB(): Promise<MapNodeType[]> {
    const nodes: MapNodeType[] | null = await getDBNodes();

    if (nodes == null) {
      console.log(`${this.loggingPrefix}No nodes found in DB`);
      return [];
    } else {
      console.log(`${this.loggingPrefix}Nodes found in DB`);
    }

    return nodes;
  }

  /**
   * Function to query database for all edges and places them in this object's array
   * Call this then get mapEdges
   */
  public async updateAndGetEdgesFromDB(): Promise<MapEdgeType[]> {
    const edges: MapEdgeType[] | null = await getDBEdges();

    if (edges == null) {
      console.log(`${this.loggingPrefix}No edges found in DB`);
      return [];
    } else {
      console.log(`${this.loggingPrefix}Edges found in DB`);
    }

    return edges;
  }

  /**
   * Helper function to get the combined path for exporting a file to the default export directory
   * @param fileName - Name of the file to export to
   */
  public getCombinedFilepath(fileName: string): string {
    return this.exportDir + fileName;
  }

  public async filterServiceRequestCategory(category: string) {
    const filteredServiceRequests: string[] = [];
    console.log(`${category} ${filteredServiceRequests}`);
    /*for(let i: number = 0; i < databaseRequests; i++){
            if(serviceReq[i][1] == category){
                filteredServiceRequests.push(serviceReq[i][1]);
            }
        }*/
  }

  public async filterServiceRequestUrgency(category: string) {
    const filteredServiceRequests: string[] = [];
    console.log(`${category} ${filteredServiceRequests}`);
    /*for(let i: number = 0; i < databaseRequests; i++){
            if(serviceReq[i][2] == category){
                filteredServiceRequests.push(serviceReq[i][2]);
            }
        }*/
  }
}
