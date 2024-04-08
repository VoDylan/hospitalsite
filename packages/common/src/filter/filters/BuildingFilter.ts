import Filter from "./Filter.ts";
import { FilterName } from "../FilterName.ts";
import MapNode from "../../map/MapNode.ts";

export default class BuildingFilter extends Filter {
  public constructor() {
    super(FilterName.BUILDING);
  }

  applyFilter(nodes: MapNode[]): MapNode[] {
    const newNodes: MapNode[] = [];

    nodes.forEach((node) => {
      if (node.building == this.filterValue) {
        newNodes.push(node);
      }
    });

    return newNodes;
  }
}
