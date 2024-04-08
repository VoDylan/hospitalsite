import Filter from "./Filter.ts";
import { FilterName } from "../FilterName.ts";
import MapNode from "../../map/MapNode.ts";

export default class FloorFilter extends Filter {
  public constructor() {
    super(FilterName.FLOOR);
  }

  applyFilter(nodes: MapNode[]): MapNode[] {
    const newNodes: MapNode[] = [];

    nodes.forEach((node) => {
      if (node.floor == this.filterValue) {
        newNodes.push(node);
      }
    });

    return newNodes;
  }
}
