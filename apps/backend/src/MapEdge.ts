import MapNode from "./MapNode";

/**
 * Custom type to define the data fields that should appear in a MapEdge
 */
type EdgeFields = {
  startNode: MapNode;
  endNode: MapNode;
};

/**
 * Class representing an edge between nodes on the map
 */
class MapEdge {
  //Attributes representing the connection between two nodes
  private _startNode: MapNode;
  private _endNode: MapNode;

  /**
   * Constructs a new MapNode object
   * @param edgeInfo - Object containing the fields that should appear in a MapEdge
   */
  public constructor(edgeInfo: EdgeFields) {
    this._startNode = edgeInfo.startNode;
    this._endNode = edgeInfo.endNode;
  }

  /**
   * Static function belonging to all MapEdge objects that returns the CSV formatted header for this specific object.
   * Header shows all data fields that should exist in the CSV version of the object
   */
  static get csvHeader(): string {
    return "startNodeID, endNodeID";
  }

  /**
   * Helper function that returns all edge data in a printable string format
   */
  public toString(): string {
    return (
      `Edge: \n` +
      `\tstartNodeID: ${this._startNode.nodeID}\n` +
      `\tendNodeID: ${this._endNode.nodeID}\n`
    );
  }

  /**
   * Helper function that returns all edge data in a writable CSV format
   */
  public toCSV(): string {
    return `${this._startNode.nodeID}, ${this._endNode.nodeID}`;
  }

  /**
   * Getter function that returns the nodeID of the startingNode for this edge
   */
  public get startNode(): string {
    return this._startNode.nodeID;
  }

  /**
   * Getter function that returns the nodeID of the endingNode for this edge
   */
  public get endNode(): string {
    return this._endNode.nodeID;
  }

  /**
   * Setter function that can set the starting node to a new starting node reference
   * @param newStartNode - Reference to the new starting node object
   */
  public set startNode(newStartNode: MapNode) {
    this._startNode = newStartNode;
  }

  /**
   * Setter function that can set the ending node to a new ending node reference
   * @param newEndNode - Reference to the new ending node object
   */
  public set endNode(newEndNode: MapNode) {
    this._endNode = newEndNode;
  }
}

//Export the MapEdge class and EdgeFields type to allow for its use across the program
export default MapEdge;
export type { EdgeFields };
