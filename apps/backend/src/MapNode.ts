/**
 * Custom type to define the data elements that should appear in a node object
 */
type NodeFields = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
};

/**
 * Class representing a node on the map
 */
class MapNode {
  //Data elements that every node should have
  private _nodeID: string;
  private _xcoord: number;
  private _ycoord: number;
  private _floor: string;
  private _building: string;
  private _nodeType: string;
  private _longName: string;
  private _shortName: string;

  private _nodeInfo: NodeFields;

  /**
   * Constructor that creates a new MapNode object using the passed in NodeFields
   * @param nodeInfo
   */
  public constructor(nodeInfo: NodeFields) {
    this._nodeID = nodeInfo.nodeID;
    this._xcoord = nodeInfo.xcoord;
    this._ycoord = nodeInfo.ycoord;
    this._floor = nodeInfo.floor;
    this._building = nodeInfo.building;
    this._nodeType = nodeInfo.nodeType;
    this._longName = nodeInfo.longName;
    this._shortName = nodeInfo.shortName;

    this._nodeInfo = nodeInfo;
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
      `\tnodeID: ${this._nodeID}\n` +
      `\txcoord: ${this._xcoord}\n` +
      `\tycoord: ${this._ycoord}\n` +
      `\tfloor: ${this._floor}\n` +
      `\tbuilding: ${this._building}\n` +
      `\tnodeType: ${this._nodeType}\n` +
      `\tlongName: ${this._longName}\n` +
      `\tshortName: ${this._shortName}\n`
    );
  }

  /**
   * Helper function to return all data for the node in a writable CSV format
   */
  public toCSV(): string {
    return `${this._nodeID}, ${this._xcoord}, ${this._ycoord}, ${this._floor}, ${this._building}, ${this._nodeType}, ${this._longName}, ${this._shortName}`;
  }

  public get nodeInfo(): NodeFields {
    return this._nodeInfo;
  }

  /**
   * Getter for the nodeID field
   */
  public get nodeID(): string {
    return this._nodeID;
  }

  /**
   * Setter for the nodeID field
   */
  public set nodeID(newNodeID: string) {
    this._nodeID = newNodeID;
  }

  /**
   * Getter for the xcoord field
   */
  public get xcoord(): number {
    return this._xcoord;
  }

  /**
   * Setter for the xcoord field
   */
  public set xcoord(newXCoord: number) {
    this._xcoord = newXCoord;
  }

  /**
   * Getter for the ycoord field
   */
  public get ycoord(): number {
    return this._ycoord;
  }

  /**
   * Setter for the ycoord field
   */
  public set ycoord(newYCoord: number) {
    this._ycoord = newYCoord;
  }

  /**
   * Getter for the floor field
   */
  public get floor(): string {
    return this._floor;
  }

  /**
   * Setter for the floor field
   */
  public set floor(newFloor: string) {
    this._floor = newFloor;
  }

  /**
   * Getter for the building field
   */
  public get building(): string {
    return this._building;
  }

  /**
   * Setter for the building field
   */
  public set building(newBuilding: string) {
    this._building = newBuilding;
  }

  /**
   * Getter for the nodeType field
   */
  public get nodeType(): string {
    return this._nodeType;
  }

  /**
   * Setter for the nodeType field
   */
  public set nodeType(newNodeType: string) {
    this._nodeType = newNodeType;
  }

  /**
   * Getter for the longName field
   */
  public get longName(): string {
    return this._longName;
  }

  /**
   * Setter for the longName field
   */
  public set longName(newLongName: string) {
    this._longName = newLongName;
  }

  /**
   * Getter for the shortName field
   */
  public get shortName(): string {
    return this._shortName;
  }

  /**
   * Setter for the shortName field
   */
  public set shortName(newShortName: string) {
    this._shortName = newShortName;
  }
}

//Exports the MapNode object and the NodeFields type to be used across the application
export default MapNode;
export type { NodeFields };
