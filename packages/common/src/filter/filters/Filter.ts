import MapNode from "../../map/MapNode.ts";
import { FilterName } from "../FilterName.ts";

export default abstract class Filter {
  private readonly _filterName: FilterName;

  private _filterValue: number | string | null;

  protected constructor(filterName: FilterName) {
    this._filterName = filterName;
    this._filterValue = null;
  }

  public abstract applyFilter(nodes: MapNode[]): MapNode[];

  public configure(filterValue: number | string): Filter {
    if (!filterValue) {
      console.error(`Filter value cannot be reconfigured to null`);
    } else {
      this._filterValue = filterValue!;
    }

    return this;
  }

  public get filterName(): FilterName {
    return this._filterName;
  }

  public get filterValue(): number | string | null {
    return this._filterValue;
  }
}
