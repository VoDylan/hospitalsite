import NodeFilter from "common/src/filter/filters/Filter.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import FilterManager, {generateFilterValue} from "common/src/filter/FilterManager.ts";
import MapNode from "common/src/map/MapNode.ts";
import GraphManager from "../common/GraphManager.ts";
import {useState} from "react";

export const useFilters = (nodeDataLoaded: boolean) => {
  const [elevatorIconState, setElevatorIconState] = useState<
    "plus" | "check"
  >("check");
  const [stairsIconState, setStairsIconState] = useState<
    "plus" | "check"
  >("check");
  const [exitsIconState, setExitsIconState] = useState<"plus" | "check">(
    "check",
  );
  const [servIconState, setServIconState] = useState<"plus" | "check">(
    "check",
  );
  const [infoIconState, setInfoIconState] = useState<"plus" | "check">(
    "check",
  );
  const [restroomsIconState, setRestroomsIconState] = useState<
    "plus" | "check"
  >("check");
  const [confIconState, setConfIconState] = useState<"plus" | "check">(
    "check",
  );
  const [deptIconState, setDeptIconState] = useState<"plus" | "check">(
    "check",
  );
  const [labsIconState, setLabsIconState] = useState<"plus" | "check">(
    "check",
  );
  const [retlIconState, setRetlIconState] = useState<"plus" | "check">(
    "check",
  );
  const [ll1IconState, setLL1IconState] = useState<"plus" | "check">(
    "check",
  );
  const [ll2IconState, setLL2IconState] = useState<"plus" | "check">(
    "check",
  );
  const [firstFloorIconState, setFirstFloorIconState] = useState<
    "plus" | "check"
  >("check");
  const [secondFloorIconState, setSecondFloorIconState] = useState<
    "plus" | "check"
  >("check");
  const [thirdFloorIconState, setThirdFloorIconState] = useState<
    "plus" | "check"
  >("check");
  
  const determineFilters = () => {
    const filters: NodeFilter[] = []; // Define the filters array here

    const applyIconFilter = (
      iconState: string,
      filterName: FilterName,
      filterValue: string,
    ) => {
      if (iconState === "plus") {
        filters.push(
          FilterManager.getInstance().getConfiguredFilter(filterName, [
            generateFilterValue(true, filterValue),
          ])!,
        );
      }
    };
  
    applyIconFilter(ll1IconState, FilterName.FLOOR, "L1");
    applyIconFilter(ll2IconState, FilterName.FLOOR, "L2");
    applyIconFilter(firstFloorIconState, FilterName.FLOOR, "1");
    applyIconFilter(secondFloorIconState, FilterName.FLOOR, "2");
    applyIconFilter(thirdFloorIconState, FilterName.FLOOR, "3");
    applyIconFilter(elevatorIconState, FilterName.TYPE, "ELEV");
    applyIconFilter(stairsIconState, FilterName.TYPE, "STAI");
    applyIconFilter(servIconState, FilterName.TYPE, "SERV");
    applyIconFilter(infoIconState, FilterName.TYPE, "INFO");
    applyIconFilter(restroomsIconState, FilterName.TYPE, "REST");
    applyIconFilter(exitsIconState, FilterName.TYPE, "EXIT");
    applyIconFilter(confIconState, FilterName.TYPE, "CONF");
    applyIconFilter(deptIconState, FilterName.TYPE, "DEPT");
    applyIconFilter(labsIconState, FilterName.TYPE, "LABS");
    applyIconFilter(retlIconState, FilterName.TYPE, "RETL");
  
    console.log("Filtering");
  
    const newFilteredNodes: MapNode[] =
      FilterManager.getInstance().applyFilters(
        filters,
        GraphManager.getInstance().nodes,
      );
  
    // Update filteredNodes state with the filtered result
    // setFilteredNodes(newFilteredNodes);
    // Update autocomplete data based on the filtered nodes
    // populateAutocompleteData(newFilteredNodes);
  };
};
