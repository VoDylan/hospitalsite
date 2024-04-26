import {NodeTypes, ValidNodeTypesList} from "common/src/map/MapNodeType.ts";

export type FilterType = NodeTypes | "floor";

export const ValidFilterTypeList: FilterType[] = [
  ...ValidNodeTypesList,
  "floor"
];
