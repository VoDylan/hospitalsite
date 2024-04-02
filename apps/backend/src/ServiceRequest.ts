/**
 * Custom type to define the data elements that should appear in a ServiceRequest
 */
type RequestFields = {
  userID: number;
  nodeID: string;
  serviceType: string;
  service: string;
};

class RequestService {
  private _userID: number;
  private _nodeID: string;
  private _serviceType: string;
  private _service: string;

  public constructor(requestInfo: RequestFields) {
    this._userID = requestInfo.userID;
    this._nodeID = requestInfo.nodeID;
    this._serviceType = requestInfo.serviceType;
    this._service = requestInfo.service;
  }

  /**
   * Helper function that returns all edge data in a writable CSV format
   */
  public reqToCSV(): string {
    return `${this._userID}, ${this._nodeID}, ${this._serviceType}, ${this._service},`;
  }

  //Getters
  public get userID(): number {
    return this._userID;
  }

  public get nodeID(): string {
    return this._nodeID;
  }

  public get serviceType(): string {
    return this._serviceType;
  }

  public get service(): string {
    return this._service;
  }

  //Setters
  public set userID(newUserID: number) {
    this._userID = newUserID;
  }

  public set nodeID(newNodeID: string) {
    this._nodeID = newNodeID;
  }

  public set serviceType(newServiceType: string) {
    this._serviceType = newServiceType;
  }

  public set service(newService: string) {
    this._service = newService;
  }
}
//Export the MapEdge class and EdgeFields type to allow for its use across the program
export default RequestService;
export type { RequestFields };
