import MapNode from "./MapNode";
import { NodeFields } from "./MapNode";
import MapEdge from "./MapEdge";
import { EdgeFields } from "./MapEdge";
import CSVTools from "./lib/CSVTools";
import fs from "fs";
import {
  createEdgePrisma,
  createNodePrisma,
  client,
  clearDBEdges,
  clearDBNodes,
  getDBNodes,
  getDBEdges,
} from "./PrismaScripts";
import mapEdge from "./MapEdge";

class DBManager {
  private static instance: DBManager;

  //Object representation of database for use across the program; kept updated on import of data and will provide new data to database
  //on map changes
  private _mapNodes: MapNode[] = [];
  private _mapEdges: MapEdge[] = [];

  //Default export directory to be used when saving nodes and edges to a CSV file
  private exportDir: string = "./apps/backend/output/";

  private loggingPrefix: string = "DBManager: ";

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
  public importNodesAndEdges(pathNode: string, pathEdge: string) {
    this._mapNodes = this.importNodeFromPath(pathNode);
    this._mapEdges = this.importEdgeFromPath(pathEdge);
  }

  /**
   * Function to sync the node and edge object arrays to the database. First clears the database and then pushes the lists
   * to the database to ensure consistency
   */
  public async syncNodesAndEdgesToDB() {
    //Clear both the edges and the nodes tables
    await clearDBEdges();
    await clearDBNodes();

    //Push the lists to the database;
    await this.listsToDB();
  }

  /**
   * Function to import Nodes from a file path into the object list and database
   * @param nodePath - Filepath for the node CSV data
   * @private
   */
  private importNodeFromPath(nodePath: string): MapNode[] {
    const newNodes: MapNode[] = [];
    //Convert file data to individual elements in a 2d array. Rows represent an individual node and the columns represent the data elements
    const nodes: string[][] = CSVTools.parseCSVFromFile(nodePath);

    //Loop through all nodes, skipping the header row
    for (let i: number = 1; i < nodes.length; i++) {
      if (nodes[i][0] == "") continue;
      //Create a NodeFields object to store all node information in an easy-to-transport object
      const nodeInfo: NodeFields = {
        nodeID: nodes[i][0],
        xcoord: parseInt(nodes[i][1]),
        ycoord: parseInt(nodes[i][2]),
        floor: nodes[i][3],
        building: nodes[i][4],
        nodeType: nodes[i][5],
        longName: nodes[i][6],
        shortName: nodes[i][7],
      };

      const node: MapNode = new MapNode(nodeInfo);

      //Create a new MapNode object with the given nodeInfo and append it to the list of nodes
      newNodes.push(node);
    }

    return newNodes;
  }

  /**
   * Function to import Edges from a file path into the object list and database
   * @param edgePath - Filepath for the edge CSV data
   * @private
   */
  private importEdgeFromPath(edgePath: string): MapEdge[] {
    const newEdges: MapEdge[] = [];
    //Convert file data to individual elements in a 2d array. Rows represent an individual edge and the columns represent the data elements
    const edges: string[][] = CSVTools.parseCSVFromFile(edgePath);

    //loop through all edges, skipping the header line
    for (let i: number = 1; i < edges.length; i++) {
      if (edges[i][0] == "") continue;
      //Get the references to the Node objects based on the imported ID. Returns null if no reference is found
      const startingNode: MapNode | null = this.getNodeByID(edges[i][0]);
      const endingNode: MapNode | null = this.getNodeByID(edges[i][1]);

      //Ensure both starting and ending nodes are valid references, doing nothing if the reference is not found. A poorly formatted edge
      //does not constitute a fatal error, so the program continues running without doing anything if either are null references
      if (startingNode == null) {
        console.log(
          `${this.loggingPrefix}Edge Generation Error: Starting node with id ${edges[i][0]} not found!`,
        );
      } else if (endingNode == null) {
        console.log(
          `${this.loggingPrefix}Edge Generation Error: Ending node with id ${edges[i][1]} not found!`,
        );
      } else {
        //If both edges are valid, create an EdgeFields object storing the references to each, marking them as non-null since they
        //are guaranteed to be valid at this point in the code
        const edgeInfo: EdgeFields = {
          startNode: startingNode!,
          endNode: endingNode!,
        };

        const edge: MapEdge = new MapEdge(edgeInfo);

        //Push a new MapEdge object with the passed in information to the mapEdges list
        newEdges.push(edge);
      }
    }

    return newEdges;
  }

  /**
   * Function to export the list of nodes and edges to a CSV file
   */
  public exportNodesAndEdgesToCSV() {
    const exportNodesFileName: string = "nodes.csv";
    const exportEdgesFileName: string = "edges.csv";

    //Check if the export directory already exists and create it if not
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir);
    }
    //Open a new CSV file to write the node information to and write the CSV header to the file
    fs.writeFileSync(
      this.getCombinedFilepath(exportNodesFileName),
      MapNode.csvHeader + "\n",
      { encoding: "utf8", flag: "w" },
    );

    //Loop through all mapNodes and append their information in CSV format to the previously opened node CSV file
    for (let i = 0; i < this._mapNodes.length; i++) {
      const data = this._mapNodes[i].toCSV();
      fs.appendFileSync(
        this.getCombinedFilepath(exportNodesFileName),
        data + (i != this.mapNodes.length - 1 ? "\n" : ""),
        { encoding: "utf8", flag: "a" },
      );
    }

    //Open a new CSV file to write the edge information to and write the CSV header to the file
    fs.writeFileSync(
      this.getCombinedFilepath(exportEdgesFileName),
      MapEdge.csvHeader + "\n",
      { encoding: "utf8", flag: "w" },
    );

    //Loop through all mapEdges and append their information in CSV format to the previously opened edge CSV file
    for (let i = 0; i < this._mapEdges.length; i++) {
      const data = this._mapEdges[i].toCSV();
      fs.appendFileSync(
        this.getCombinedFilepath(exportEdgesFileName),
        data + (i != this.mapNodes.length - 1 ? "\n" : ""),
        { encoding: "utf8", flag: "a" },
      );
    }
  }

  /**
   * Function to congregate map lists to put in DB
   */
  public async toDB() {
    await this.listsToDB();
  }

  /**
   * Helper function to print the nodes in string format
   */
  public printNodes() {
    let prints: string = "";
    for (let i = 0; i < this._mapNodes.length; i++) {
      prints = prints + this._mapNodes[i].toString();
    }
    console.log(`${this.loggingPrefix}\n${prints}`);
  }

  /**
   * Helper function to print the edges in string format
   */
  public printEdges() {
    let prints: string = "";
    for (let i = 0; i < this._mapEdges.length; i++) {
      prints = prints + this._mapEdges[i].toString();
    }
    console.log(`${this.loggingPrefix}${prints}`);
  }

  /**
   * Helper function to get a node object reference based on a nodeID
   * Does not query the database, rather it obtains the object from the list of nodes
   * @param nodeID - The NodeID to search for
   */
  public getNodeByID(nodeID: string): MapNode | null {
    for (let i = 0; i < this._mapNodes.length; i++) {
      if (this._mapNodes[i].nodeID == nodeID) return this._mapNodes[i];
    }

    return null;
  }

  /**
   * Getter function for the list of MapNode objects
   */
  public get mapNodes(): MapNode[] {
    return this._mapNodes;
  }

  /**
   * Getter function for the list of MapEdge objects
   */
  public get mapEdges(): MapEdge[] {
    return this._mapEdges;
  }

  /**
   * Function to query database for all nodes and places them in this object's array
   * Call this then get mapNodes
   */

  public async updateAndGetNodesFromDB() {
    const nodes = await getDBNodes();
    const newNodes: MapNode[] = [];

    if (nodes == null) {
      console.log(`${this.loggingPrefix}No nodes found in DB`);
      return [];
    } else {
      console.log(`${this.loggingPrefix}Nodes found in DB`);
    }
    //Loop through all nodes
    for (let i: number = 0; i < nodes.length; i++) {
      //Create a NodeFields object to store all node information in an easy-to-transport object
      const nodeInfo: NodeFields = {
        nodeID: nodes[i].nodeID,
        xcoord: nodes[i].xcoord,
        ycoord: nodes[i].ycoord,
        floor: nodes[i].floor!,
        building: nodes[i].building!,
        nodeType: nodes[i].nodeType!,
        longName: nodes[i].longName!,
        shortName: nodes[i].shortName!,
      };

      const node: MapNode = new MapNode(nodeInfo);

      //Create a new MapNode object with the given nodeInfo and append it to the list of nodes
      newNodes.push(node);
    }
    console.log(`${this.loggingPrefix}Updated node objects from DB`);
    this._mapNodes = newNodes;
    return nodes;
  }

  /**
   * Function to query database for all edges and places them in this object's array
   * Call this then get mapEdges
   */
  public async updateAndGetEdgesFromDB() {
    const edges = await getDBEdges();
    const newEdges: mapEdge[] = [];

    //First sync the nodes stored in the database to the objects
    await this.updateAndGetNodesFromDB();

    if (edges == null) {
      console.log(`${this.loggingPrefix}No edges found in DB`);
      return [];
    } else {
      console.log(`${this.loggingPrefix}Edges found in DB`);
    }

    //loop through all edges
    for (let i: number = 0; i < edges.length; i++) {
      //Get the references to the Node objects based on the imported ID. Returns null if no reference is found
      const startingNode: MapNode | null = this.getNodeByID(
        edges[i].startNodeID,
      );
      const endingNode: MapNode | null = this.getNodeByID(edges[i].endNodeID);

      if (startingNode == null) {
        console.log(
          `${this.loggingPrefix}Starting node not found. Have the nodes been synced from the database?`,
        );
        return null;
      }

      if (endingNode == null) {
        console.log(
          `${this.loggingPrefix}Ending node not found. Have the nodes been synced from the database?`,
        );
        return null;
      }

      //If both edges are valid, create an EdgeFields object storing the references to each, marking them as non-null since they
      //are guaranteed to be valid at this point in the code
      const edgeInfo: EdgeFields = {
        startNode: startingNode!,
        endNode: endingNode!,
      };
      const edge: mapEdge = new MapEdge(edgeInfo);
      newEdges.push(edge);
    }

    console.log(`${this.loggingPrefix}Updated edge objects from DB`);
    this._mapEdges = newEdges;
    return edges;
  }

  /**
   * Helper function to get the combined path for exporting a file to the default export directory
   * @param fileName - Name of the file to export to
   */
  public getCombinedFilepath(fileName: string): string {
    return this.exportDir + fileName;
  }

  /**
   * Function to query database and update node object if any discrepancies are found
   * @param nodeID - ID of node to check against
   */
  public async updateNodeFromDB(nodeID: string): Promise<void> {
    const origNode: MapNode | null = this.getNodeByID(nodeID);

    if (origNode == null) {
      console.log(`${this.loggingPrefix}Node does not exist as object.`);
      return;
    } else {
      const DBNode = await client.node.findUnique({
        where: {
          nodeID: nodeID,
        },
      });
      if (DBNode == null) {
        console.log(`${this.loggingPrefix}Node does not exist in database.`);
      } else {
        origNode.xcoord = DBNode.xcoord;
        origNode.ycoord = DBNode.ycoord;
        origNode.floor = DBNode.floor!;
        origNode.building = DBNode.building!;
        origNode.nodeType = DBNode.nodeType!;
        origNode.longName = DBNode.longName!;
        origNode.shortName = DBNode.shortName!;
      }
    }
  }

  /**
   * Function to query database and update edge object if any discrepancies are found
   * @param startID - ID for starting node of edge
   * @param endID - ID for ending node of edge
   */
  public async updateEdgeFromDB(startID: string, endID: string) {
    let origEdge: mapEdge | null = null;
    for (let i = 0; i < this._mapEdges.length; i++) {
      if (
        this._mapEdges[i].startNodeID == startID &&
        this._mapEdges[i].endNodeID == endID
      ) {
        origEdge = this._mapEdges[i];
      }
    }
    if (origEdge == null) {
      console.log(`${this.loggingPrefix}Edge does not exist as an object.`);
      return;
    } else {
      const DBEdge = await client.edge.findFirst({
        where: {
          startNodeID: startID,
          endNodeID: endID,
        },
      });
      if (DBEdge == null) {
        console.log(`${this.loggingPrefix}Edge does not exist in database.`);
      } else {
        const startNode: MapNode | null = this.getNodeByID(DBEdge.startNodeID);
        const endNode: MapNode | null = this.getNodeByID(DBEdge.endNodeID);

        if (startNode == null || endNode == null) {
          console.log(`${this.loggingPrefix}startNode or endNode not found!`);
        } else {
          origEdge.startNode = startNode!;
          origEdge.endNode = endNode!;
        }
      }
    }
  }

  /**
   * Helper function to loop over filled map arrays and put the objects into the database
   */
  private async listsToDB() {
    await createNodePrisma(this._mapNodes);
    await createEdgePrisma(this._mapEdges);
  }
}

//Export the DBManager class to make it accessible to the rest of the program
export default DBManager;
