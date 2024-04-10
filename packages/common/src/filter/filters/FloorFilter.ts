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

      let passesInclusiveFilters: boolean = false;
      let passesExclusiveFilters: boolean = true;

      const inclusionFilters: FilterValueType[] = [];
      const exclusionFilters: FilterValueType[] = [];

      this.filterValues.forEach((filterParam: FilterValueType) => {
        filterParam.exclude
          ? exclusionFilters.push(filterParam)
          : inclusionFilters.push(filterParam);
      });

      if (inclusionFilters.length == 0) {
        passesInclusiveFilters = true;
      } else {
        inclusionFilters.forEach((filterParam: FilterValueType) => {
          passesInclusiveFilters =
            passesInclusiveFilters || node.floor == filterParam.value;
        });
      }

      if (exclusionFilters.length == 0) {
        passesExclusiveFilters = true;
      } else {
        exclusionFilters.forEach((filterParam: FilterValueType) => {
          passesExclusiveFilters =
            passesExclusiveFilters && node.floor != filterParam.value;
        });
      }

      if (passesInclusiveFilters && passesExclusiveFilters) newNodes.push(node);
    });

    return newNodes;
  }
}
