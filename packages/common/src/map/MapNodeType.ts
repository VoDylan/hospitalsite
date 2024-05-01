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

export enum NodeType {
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
  NodeType.ELEV,
  NodeType.STAI,
  NodeType.SERV,
  NodeType.INFO,
  NodeType.REST,
  NodeType.EXIT,
  NodeType.CONF,
  NodeType.DEPT,
  NodeType.LABS,
  NodeType.RETL,
  NodeType.HALL,
];

export const getNodeTypeFromStr = (strType: string): NodeType | undefined => {
  for(const type of ValidNodeTypesList) {
    if(type === strType) return type;
  }

  return undefined;
};
