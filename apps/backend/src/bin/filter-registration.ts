import FilterManager from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import BuildingFilter from "common/src/filter/filters/BuildingFilter.ts";
import FloorFilter from "common/src/filter/filters/FloorFilter.ts";
import TypeFilter from "common/src/filter/filters/TypeFilter.ts";

export const registerFilters = () => {
  FilterManager.getInstance().registerFilter(
    FilterName.BUILDING,
    () => new BuildingFilter(),
  );
  FilterManager.getInstance().registerFilter(
    FilterName.FLOOR,
    () => new FloorFilter(),
  );
  FilterManager.getInstance().registerFilter(
    FilterName.TYPE,
    () => new TypeFilter(),
  );
};
