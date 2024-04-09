import Filter from "./Filter.ts";
import { FilterName } from "../FilterName.ts";
import MapNode from "../../map/MapNode.ts";
import { FilterValueType } from "../FilterManager.ts";

export default class FloorFilter extends Filter {
  public constructor() {
    super(FilterName.FLOOR);
  }

  applyFilter(nodes: MapNode[]): MapNode[] {
    const newNodes: MapNode[] = [];

    nodes.forEach((node) => {
      if (this.filterValues.length == 0) return;

      let included: boolean = false;
      this.filterValues.forEach((filterParam: FilterValueType) => {
        included =
          included ||
          (filterParam.inverted
            ? node.floor != filterParam.value
            : node.floor == filterParam.value);
      });

      if (included) newNodes.push(node);
    });

    return newNodes;
  }
}
