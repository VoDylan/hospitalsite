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
