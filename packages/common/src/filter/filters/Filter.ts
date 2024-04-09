import MapNode from "../../map/MapNode.ts";
import { FilterName } from "../FilterName.ts";
import { FilterValueType } from "../FilterManager.ts";

export default abstract class Filter {
  private readonly _filterName: FilterName;

  private _filterValues: FilterValueType[];

  protected constructor(filterName: FilterName) {
    this._filterName = filterName;
    this._filterValues = [];
  }

  public abstract applyFilter(nodes: MapNode[]): MapNode[];

  public configure(filterValues: FilterValueType[]): Filter {
    if (filterValues.length == 0) {
      console.error(`Filter value cannot be reconfigured to null`);
    } else {
      this._filterValues = filterValues!;
    }

    return this;
  }

  public get filterName(): FilterName {
    return this._filterName;
  }

  public get filterValues(): FilterValueType[] {
    return this._filterValues;
  }
}
