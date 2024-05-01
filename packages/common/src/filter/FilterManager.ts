import Filter from "./filters/Filter.ts";
import { FilterName } from "./FilterName.ts";
import MapNode from "../map/MapNode.ts";

export type FilterValueType = {
  exclude: boolean;
  value: number | string;
};

export const generateFilterValue = (
  exclude: boolean,
  value: number | string,
): FilterValueType => {
  return {
    exclude: exclude,
    value: value,
  };
};

export default class FilterManager {
  private static instance: FilterManager;

  private readonly registeredFilters: Map<FilterName, () => Filter>;

  public static getInstance() {
    if (!FilterManager.instance) {
      FilterManager.instance = new FilterManager();
    }
    return FilterManager.instance;
  }

  private constructor() {
    this.registeredFilters = new Map<FilterName, () => Filter>();
  }

  public registerFilter(filterName: FilterName, filterGenerator: () => Filter) {
    console.log(`Registering filter: ${filterName}`);
    this.registeredFilters.set(filterName, filterGenerator);
  }

  public getConfiguredFilter(
    filterName: FilterName,
    filterValues: FilterValueType[],
  ): Filter | undefined {
    const filterGenerator: (() => Filter) | undefined =
      this.registeredFilters.get(filterName);

    if (!filterGenerator) {
      console.error(
        "A filter under the given name has not been registered yet",
      );
      return;
    }

    return filterGenerator().configure(filterValues);
  }

  public applyFilters(activeFilters: Filter[], data: MapNode[]): MapNode[] {
    let filteredData: MapNode[] = data;

    activeFilters.forEach((filter: Filter) => {
      filteredData = filter.applyFilter(filteredData);
    });

    return filteredData;
  }
}
