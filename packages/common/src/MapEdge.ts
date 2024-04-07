import MapNode from "./MapNode";
import { MapEdgeType } from "common/src/MapEdgeType.ts";
import { NodeDoesNotExistError } from "common/src/errors/NodeDoesNotExistError.ts";
import GraphManager from "./GraphManager.ts";

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
   * @throws {NodeDoesNotExistError}
   */
  public constructor(edgeInfo: MapEdgeType) {
    const nodes: { startNode: MapNode; endNode: MapNode } =
      this.verifyAndSetNodes(edgeInfo);

    this._startNode = nodes.startNode;
    this._endNode = nodes.endNode;

    this._edgeInfo = edgeInfo;
  }

  private verifyAndSetNodes(edgeInfo: MapEdgeType): {
    startNode: MapNode;
    endNode: MapNode;
  } {
    const startNode: MapNode | null = GraphManager.getInstance().getNodeByID(
      edgeInfo.startNodeID,
    );
    const endNode: MapNode | null = GraphManager.getInstance().getNodeByID(
      edgeInfo.endNodeID,
    );

    if (startNode == null) {
      throw new NodeDoesNotExistError(
        `Start node of ID ${edgeInfo.startNodeID} does not exist!`,
      );
    }

    if (endNode == null) {
      throw new NodeDoesNotExistError(
        `End node of ID ${edgeInfo.endNodeID} does not exist!`,
      );
    }

    return {
      startNode: startNode,
      endNode: endNode,
    };
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

  public set edgeInfo(newEdgeInfo: MapEdgeType) {
    const nodes: { startNode: MapNode; endNode: MapNode } =
      this.verifyAndSetNodes(newEdgeInfo);

    this._startNode = nodes.startNode;
    this._endNode = nodes.endNode;

    this._edgeInfo = newEdgeInfo;
  }
}

//Export the MapEdge class and EdgeFields type to allow for its use across the program
export default MapEdge;
