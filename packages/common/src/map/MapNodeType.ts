export type MapNodeType = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
};

export const emptyNodeInfo: MapNodeType = {
  nodeID: "",
  xcoord: 0,
  ycoord: 0,
  floor: "",
  building: "",
  nodeType: "",
  longName: "",
  shortName: "",
};

export enum NodeTypes {
  ELEV = "ELEV",
  STAI = "STAI",
  SERV = "SERV",
  INFO = "INFO",
  REST = "REST",
  EXIT = "EXIT",
  CONF = "CONF",
  DEPT = "DEPT",
  LABS = "LABS",
  RETL = "RETL",
  HALL = "HALL",
}

export const ValidNodeTypesList = [
  NodeTypes.ELEV,
  NodeTypes.STAI,
  NodeTypes.SERV,
  NodeTypes.INFO,
  NodeTypes.REST,
  NodeTypes.EXIT,
  NodeTypes.CONF,
  NodeTypes.DEPT,
  NodeTypes.LABS,
  NodeTypes.RETL,
  NodeTypes.HALL,
];
