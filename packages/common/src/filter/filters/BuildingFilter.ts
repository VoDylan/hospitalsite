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
      if (
        this.filterValues &&
        this.filterValues.includes(node.building as never)
      ) {
        newNodes.push(node);
      }
    });

    return newNodes;
  }
}
