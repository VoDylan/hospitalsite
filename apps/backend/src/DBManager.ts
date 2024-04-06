import MapNode from "common/src/MapNode.ts";
import MapEdge from "common/src/MapEdge.ts";
import CSVTools from "./lib/CSVTools";
import fs from "fs";
import {
  createEdgePrisma,
  createNodePrisma,
  clearDBEdges,
  clearDBNodes,
  getDBNodes,
  getDBEdges,
  clearDBRequests,
} from "./PrismaScripts";
import client from "./bin/database-connection.ts";
import { MapNodeType } from "common/src/MapNodeType.ts";
import { MapEdgeType } from "common/src/MapEdgeType.ts";
import { NodeDoesNotExistError } from "common/src/errors/NodeDoesNotExistError.ts";
import GraphManager from "common/src/GraphManager.ts";

export default class DBManager {
  private static instance: DBManager;

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
    GraphManager.getInstance().nodes = this.importNodeFromPath(pathNode);
    GraphManager.getInstance().edges = this.importEdgeFromPath(pathEdge);
  }

  /**
   * Function to sync the node and edge object arrays to the database. First clears the database and then pushes the lists
   * to the database to ensure consistency
   */
  public async syncNodesAndEdgesToDB() {
    //Clear both the edges and the nodes tables
    await clearDBRequests();
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
      const edgeInfo: MapEdgeType = {
        startNodeID: edges[i][0],
        endNodeID: edges[i][1],
      };

      try {
        const edge: MapEdge = new MapEdge(edgeInfo);

        //Push a new MapEdge object with the passed in information to the mapEdges list
        newEdges.push(edge);
      } catch (e) {
        if (e instanceof NodeDoesNotExistError) {
          console.log(e.message);
        } else {
          console.log(e);
        }
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
    for (let i = 0; i < GraphManager.getInstance().nodes.length; i++) {
      const data = GraphManager.getInstance().nodes[i].toCSV();
      fs.appendFileSync(
        this.getCombinedFilepath(exportNodesFileName),
        data + (i != GraphManager.getInstance().nodes.length - 1 ? "\n" : ""),
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
    for (let i = 0; i < GraphManager.getInstance().edges.length; i++) {
      const data = GraphManager.getInstance().edges[i].toCSV();
      fs.appendFileSync(
        this.getCombinedFilepath(exportEdgesFileName),
        data + (i != GraphManager.getInstance().nodes.length - 1 ? "\n" : ""),
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
    for (let i = 0; i < GraphManager.getInstance().nodes.length; i++) {
      prints = prints + GraphManager.getInstance().nodes[i].toString();
    }
    console.log(`${this.loggingPrefix}\n${prints}`);
  }

  /**
   * Helper function to print the edges in string format
   */
  public printEdges() {
    let prints: string = "";
    for (let i = 0; i < GraphManager.getInstance().edges.length; i++) {
      prints = prints + GraphManager.getInstance().edges[i].toString();
    }
    console.log(`${this.loggingPrefix}${prints}`);
  }

  /**
   * Function to query database for all nodes and places them in this object's array
   * Call this then get mapNodes
   */

  public async updateAndGetNodesFromDB(): Promise<MapNodeType[]> {
    const nodes: MapNodeType[] | null = await getDBNodes();
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
      const nodeInfo: MapNodeType = {
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
    GraphManager.getInstance().nodes = newNodes;
    return nodes;
  }

  /**
   * Function to query database for all edges and places them in this object's array
   * Call this then get mapEdges
   */
  public async updateAndGetEdgesFromDB(): Promise<MapEdgeType[]> {
    const edges: MapEdgeType[] | null = await getDBEdges();
    const newEdges: MapEdge[] = [];

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
      //If both edges are valid, create an EdgeFields object storing the references to each, marking them as non-null since they
      //are guaranteed to be valid at this point in the code
      const edgeInfo: MapEdgeType = {
        startNodeID: edges[i].startNodeID,
        endNodeID: edges[i].endNodeID,
      };
      try {
        const edge: MapEdge = new MapEdge(edgeInfo);
        newEdges.push(edge);
      } catch (e) {
        if (e instanceof NodeDoesNotExistError) {
          console.log(e.message);
        } else {
          console.log(e);
        }
      }
    }

    console.log(`${this.loggingPrefix}Updated edge objects from DB`);
    GraphManager.getInstance().edges = newEdges;
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
    const origNode: MapNode | null =
      GraphManager.getInstance().getNodeByID(nodeID);

    if (origNode == null) {
      console.log(`${this.loggingPrefix}Node does not exist as object.`);
      return;
    } else {
      const DBNode: MapNodeType | null = await client.node.findUnique({
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
    let origEdgeIndex: number = -1;
    for (let i = 0; i < GraphManager.getInstance().edges.length; i++) {
      if (
        GraphManager.getInstance().edges[i].startNodeID == startID &&
        GraphManager.getInstance().edges[i].endNodeID == endID
      ) {
        origEdgeIndex = i;
      }
    }
    if (origEdgeIndex == -1) {
      console.log(`${this.loggingPrefix}Edge does not exist as an object.`);
      return;
    } else {
      const DBEdge: MapEdgeType | null = await client.edge.findFirst({
        where: {
          startNodeID: startID,
          endNodeID: endID,
        },
      });
      if (DBEdge == null) {
        console.log(`${this.loggingPrefix}Edge does not exist in database.`);
      } else {
        const newEdgeInfo: MapEdgeType = {
          startNodeID: startID,
          endNodeID: endID,
        };

        try {
          GraphManager.getInstance().edges[origEdgeIndex].edgeInfo =
            newEdgeInfo;
        } catch (e) {
          if (e instanceof NodeDoesNotExistError) {
            console.log(e.message);
          } else {
            console.log(e);
          }
        }
      }
    }
  }

  /**
   * Helper function to loop over filled map arrays and put the objects into the database
   */
  private async listsToDB() {
    await createNodePrisma(GraphManager.getInstance().nodes);
    await createEdgePrisma(GraphManager.getInstance().edges);
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
