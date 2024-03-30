import MapNode from "./MapNode";
import { NodeFields } from "./MapNode";
import MapEdge from "./MapEdge";
import { EdgeFields } from "./MapEdge";
import CSVTools from "./lib/CSVTools";
import fs from "fs";
import { createEdgePrisma, createNodePrisma } from "./PrismaScripts";

class DBManager {
  //Object representation of database for use across the program; kept updated on import of data and will provide new data to database
  //on map changes
  private _mapNodes: MapNode[] = [];
  private _mapEdges: MapEdge[] = [];

  //Default export directory to be used when saving nodes and edges to a CSV file
  private exportDir: string = "./output/";

  /**
   * Public helper function to import both nodes and edges from individual file paths
   * @param pathNode - Filepath for the node CSV data
   * @param pathEdge - Filepath for the edge CSV data
   */
  public async importNodesAndEdges(pathNode: string, pathEdge: string) {
    await this.importNodeFromPath(pathNode);
    await this.importEdgeFromPath(pathEdge);
  }

  /**
   * Function to import Nodes from a file path into the object list and database
   * @param nodePath - Filepath for the node CSV data
   * @private
   */
  private async importNodeFromPath(nodePath: string) {
    //Convert file data to individual elements in a 2d array. Rows represent an individual node and the columns represent the data elements
    const nodes: string[][] = CSVTools.parseCSVFromFile(nodePath);

    //Loop through all nodes, skipping the header row
    for (let i: number = 1; i < nodes.length; i++) {
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
      this._mapNodes.push(node);

      await createNodePrisma(node);
    }
  }

  /**
   * Function to import Edges from a file path into the object list and database
   * @param edgePath - Filepath for the edge CSV data
   * @private
   */
  private async importEdgeFromPath(edgePath: string) {
    //Convert file data to individual elements in a 2d array. Rows represent an individual edge and the columns represent the data elements
    const edges: string[][] = CSVTools.parseCSVFromFile(edgePath);

    //loop through all edges, skipping the header line
    for (let i: number = 1; i < edges.length; i++) {
      //Get the references to the Node objects based on the imported ID. Returns null if no reference is found
      const startingNode: MapNode | null = this.getNodeByID(edges[i][0]);
      const endingNode: MapNode | null = this.getNodeByID(edges[i][1]);

      //Ensure both starting and ending nodes are valid references, doing nothing if the reference is not found. A poorly formatted edge
      //does not constitute a fatal error, so the program continues running without doing anything if either are null references
      if (startingNode == null) {
        console.log(
          `Edge Generation Error: Starting node with id ${edges[i][0]} not found!`,
        );
      } else if (endingNode == null) {
        console.log(
          `Edge Generation Error: Ending node with id ${edges[i][1]} not found!`,
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
        this._mapEdges.push(edge);

        await createEdgePrisma(edge);
      }
    }
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
   * Helper function to print the nodes in string format
   */
  public printNodes() {
    let prints: string = "";
    for (let i = 0; i < this._mapNodes.length; i++) {
      prints = prints + this._mapNodes[i].toString();
    }
    console.log(prints);
  }

  /**
   * Helper function to print the edges in string format
   */
  public printEdges() {
    let prints: string = "";
    for (let i = 0; i < this._mapEdges.length; i++) {
      prints = prints + this._mapEdges[i].toString();
    }
    console.log(prints);
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
   * Helper function to get the combined path for exporting a file to the default export directory
   * @param fileName - Name of the file to export to
   */
  public getCombinedFilepath(fileName: string): string {
    return this.exportDir + fileName;
  }
}

//Export the DBManager class to make it accessible to the rest of the program
export default DBManager;
