import MapNode from "../../map/MapNode.ts";
import { FilterName } from "../FilterName.ts";

export default abstract class Filter {
  private readonly _filterName: FilterName;

  private _filterValues: number[] | string[] | null;

  protected constructor(filterName: FilterName) {
    this._filterName = filterName;
    this._filterValues = null;
  }

  public abstract applyFilter(nodes: MapNode[]): MapNode[];

  public configure(filterValues: number[] | string[]): Filter {
    if (!filterValues) {
      console.error(`Filter value cannot be reconfigured to null`);
    } else {
      this._filterValues = filterValues!;
    }

    return this;
  }

  public get filterName(): FilterName {
    return this._filterName;
  }

  public get filterValues(): number[] | string[] | null {
    return this._filterValues;
  }
}
