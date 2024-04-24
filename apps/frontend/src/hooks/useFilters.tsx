import {useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";

export const useFilters = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);

  useEffect(() => {
    if(!filtersApplied && dataLoaded) {

    }
  }, [dataLoaded, filtersApplied]);

  return {filteredNodes, setDataLoaded, filtersApplied, setFiltersApplied};
};
