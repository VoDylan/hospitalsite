import { MapNodeType } from "./MapNodeType.ts";

/**
 * Class representing a node on the map
 */
class MapNode {
  private _nodeInfo: MapNodeType;

  /**
   * Constructor that creates a new MapNode object using the passed in NodeFields
   * @param nodeInfo
   */
  public constructor(nodeInfo?: MapNodeType) {
    if(nodeInfo) {
      this._nodeInfo = nodeInfo;
    } else {
      this._nodeInfo = {
        nodeID: "",
        xcoord: 0,
        ycoord: 0,
        floor: "",
        building: "",
        nodeType: "",
        longName: "",
        shortName: "",
      };
    }
  }

  /**
   * Static method belonging to the MapNode class that returns the CSV formatted header for the node object to be used when exporting nodes
   */
  static get csvHeader(): string {
    return "nodeID, xcoord, ycoord, floor, building, nodeType, longName, shortName";
  }

  /**
   * Helper function to return all data represented by the node in a printable string format
   */
  public toString(): string {
    return (
      `Node: \n` +
      `\tnodeID: ${this.nodeID}\n` +
      `\txcoord: ${this.xcoord}\n` +
      `\tycoord: ${this.ycoord}\n` +
      `\tfloor: ${this.floor}\n` +
      `\tbuilding: ${this.building}\n` +
      `\tnodeType: ${this.nodeType}\n` +
      `\tlongName: ${this.longName}\n` +
      `\tshortName: ${this.shortName}\n`
    );
  }

  /**
   * Helper function to return all data for the node in a writable CSV format
   */
  public toCSV(): string {
    return `${this.nodeID}, ${this.xcoord}, ${this.ycoord}, ${this.floor}, ${this.building}, ${this.nodeType}, ${this.longName}, ${this.shortName}`;
  }

  public get nodeInfo(): MapNodeType {
    return this._nodeInfo;
  }

  /**
   * Getter for the nodeID field
   */
  public get nodeID(): string {
    return this.nodeInfo.nodeID;
  }

  /**
   * Setter for the nodeID field
   */
  public set nodeID(newNodeID: string) {
    this.nodeInfo.nodeID = newNodeID;
  }

  /**
   * Getter for the xcoord field
   */
  public get xcoord(): number {
    return this.nodeInfo.xcoord;
  }

  /**
   * Setter for the xcoord field
   */
  public set xcoord(newXCoord: number) {
    this.nodeInfo.xcoord = newXCoord;
  }

  /**
   * Getter for the ycoord field
   */
  public get ycoord(): number {
    return this.nodeInfo.ycoord;
  }

  /**
   * Setter for the ycoord field
   */
  public set ycoord(newYCoord: number) {
    this.nodeInfo.ycoord = newYCoord;
  }

  /**
   * Getter for the floor field
   */
  public get floor(): string {
    return this.nodeInfo.floor;
  }

  /**
   * Setter for the floor field
   */
  public set floor(newFloor: string) {
    this.nodeInfo.floor = newFloor;
  }

  /**
   * Getter for the building field
   */
  public get building(): string {
    return this.nodeInfo.building;
  }

  /**
   * Setter for the building field
   */
  public set building(newBuilding: string) {
    this.nodeInfo.building = newBuilding;
  }

  /**
   * Getter for the nodeType field
   */
  public get nodeType(): string {
    return this.nodeInfo.nodeType;
  }

  /**
   * Setter for the nodeType field
   */
  public set nodeType(newNodeType: string) {
    this.nodeInfo.nodeType = newNodeType;
  }

  /**
   * Getter for the longName field
   */
  public get longName(): string {
    return this.nodeInfo.longName;
  }

  /**
   * Setter for the longName field
   */
  public set longName(newLongName: string) {
    this.nodeInfo.longName = newLongName;
  }

  /**
   * Getter for the shortName field
   */
  public get shortName(): string {
    return this.nodeInfo.shortName;
  }

  /**
   * Setter for the shortName field
   */
  public set shortName(newShortName: string) {
    this.nodeInfo.shortName = newShortName;
  }
}

//Exports the MapNode object and the NodeFields type to be used across the application
export default MapNode;
