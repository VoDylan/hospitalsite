import Filter from "./Filter.ts";
import { FilterName } from "../FilterName.ts";
import MapNode from "../../map/MapNode.ts";
import { FilterValueType } from "../FilterManager.ts";

export default class TypeFilter extends Filter {
  public constructor() {
    super(FilterName.TYPE);
  }

  applyFilter(nodes: MapNode[]): MapNode[] {
    const newNodes: MapNode[] = [];

    nodes.forEach((node) => {
      if (this.filterValues.length == 0) return;

      let included: boolean = true;
      this.filterValues.forEach((filterParam: FilterValueType) => {
        included =
          included &&
          (filterParam.inverted
            ? node.nodeType != filterParam.value
            : node.nodeType == filterParam.value);
      });

      if (included) newNodes.push(node);
    });

    return newNodes;
  }
}
