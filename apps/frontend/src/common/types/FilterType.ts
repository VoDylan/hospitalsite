import {NodeType, ValidNodeTypesList} from "common/src/map/MapNodeType.ts";

export type FilterType = NodeType | "floor";

export const ValidFilterTypeList: FilterType[] = [
  ...ValidNodeTypesList,
  "floor"
];
