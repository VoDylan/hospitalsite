import MapNode from "./MapNode";
import { MapEdgeType } from "./MapEdgeType.ts";

/**
 * Class representing an edge between nodes on the map
 */
class MapEdge {
  //Attributes representing the connection between two nodes
  private _startNode: MapNode;
  private _endNode: MapNode;

  private _edgeInfo: MapEdgeType;

  /**
   * Constructs a new MapNode object
   * @param edgeInfo - Object containing the fields that should appear in a MapEdge
   * @param startNode - Object representation of the starting node for use in graphs
   * @param endNode - Object representation of the ending node for use in graphs
   * @throws {NodeDoesNotExistError}
   */
  public constructor(
    edgeInfo: MapEdgeType,
    startNode: MapNode,
    endNode: MapNode,
  ) {
    this._startNode = startNode;
    this._endNode = endNode;

    this._edgeInfo = edgeInfo;
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
    return `${this._edgeInfo.startNodeID}, ${this._endNode.nodeID}`;
  }

  /**
   * Getter function that returns the nodeID of the startingNode for this edge
   */
  public get startNodeID(): string {
    return this.edgeInfo.startNodeID;
  }

  /**
   * Getter function that returns the starting node object for this edge
   */

  public get startNode(): MapNode {
    return this._startNode;
  }

  /**
   * Setter function that can set the starting node to a new starting node reference
   * @param newStartNode - Reference to the new starting node object
   */
  public set startNode(newStartNode: MapNode) {
    this._startNode = newStartNode;
  }

  /**
   * Getter function that returns the nodeID of the endingNode for this edge
   */
  public get endNodeID(): string {
    return this.edgeInfo.endNodeID;
  }

  /**
   * Getter function that returns the end node object for this edge
   */
  public get endNode(): MapNode {
    return this._endNode;
  }

  /**
   * Setter function that can set the ending node to a new ending node reference
   * @param newEndNode - Reference to the new ending node object
   */
  public set endNode(newEndNode: MapNode) {
    this._endNode = newEndNode;
  }

  public get edgeInfo(): MapEdgeType {
    return this._edgeInfo;
  }

  public set edgeInfo(newEdgeInfo: {
    edgeType: MapEdgeType;
    startNode: MapNode;
    endNode: MapNode;
  }) {
    this._startNode = newEdgeInfo.startNode;
    this._endNode = newEdgeInfo.endNode;

    this._edgeInfo = newEdgeInfo.edgeType;
  }
}

//Export the MapEdge class and EdgeFields type to allow for its use across the program
export default MapEdge;
