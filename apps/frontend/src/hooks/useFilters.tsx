import React, {useCallback, useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import {validNodeTypes} from "common/src/map/MapNodeType.ts";
import FilterManager, {FilterValueType, generateFilterValue} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";

interface IFilterState {
  filterValue: FilterValueType;
  active: boolean;
}

export const useFilters = (): [
  MapNode[],
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<MapNode[]>>,
  React.Dispatch<React.SetStateAction<{
    type: string,
    active: boolean
  } | null>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [nodeData, setNodeData] = useState<MapNode[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);

  const [filterAssociations, setFilterAssociations] = useState<Map<string, IFilterState>>(new Map());
  const [filtersRegistered, setFiltersRegistered] = useState<boolean>(false);

  const [newFilterActiveStatus, setNewFilterActiveStatus] = useState<{type: string, active: boolean} | null>(null);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNone, setSelectNone] = useState<boolean>(false);

  /**
   * Helper callback function that sets a given filter association's active status to the passed in status
   */
  const setFilterActiveState = useCallback((nodeType: string, newActiveStatus: boolean) => {
    const newFilterState: IFilterState | undefined = filterAssociations.get(nodeType);
    if(newFilterState) {
      newFilterState.active = newActiveStatus;
      filterAssociations.set(nodeType, newFilterState);
    }
  }, [filterAssociations]);

  /**
   * If filters have not been generated for all node types yet, generate them
   */
  useEffect(() => {
    if(!filtersRegistered) {
      const newRegisteredFilters: Map<string, IFilterState> = new Map<string, IFilterState>();
      for(const type of validNodeTypes) {
        newRegisteredFilters.set(type, {
          filterValue: generateFilterValue(false, type),
          active: true,
        });
      }

      setFilterAssociations(newRegisteredFilters);
      setFiltersRegistered(true);
    }
  }, [filtersRegistered]);

  /**
   * If the flag is set to change the status of a filter association, set the state to the new state
   */
  useEffect(() => {
    if(filtersRegistered && newFilterActiveStatus) {
      if(filterAssociations.has(newFilterActiveStatus.type)) {
        setFilterActiveState(newFilterActiveStatus.type, newFilterActiveStatus.active);
      }
    }

    setFiltersApplied(false);
  }, [filterAssociations, filtersRegistered, newFilterActiveStatus, setFilterActiveState]);

  /**
   * If filters are registered, not applied, and the data is loaded, calculate the set of filtered nodes
   */
  useEffect(() => {
    if(!filtersApplied && filtersRegistered) {
      const activeFilterValues: FilterValueType[] = [];

      for(const filterState of filterAssociations.values()) {
        if(filterState.active) activeFilterValues.push(filterState.filterValue);
      }

      const typeFilter: Filter = FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, activeFilterValues)!;

      const filteredNodes: MapNode[] = FilterManager.getInstance().applyFilters([typeFilter], nodeData);

      setFilteredNodes(filteredNodes);
      setFiltersApplied(true);
    }
  }, [nodeData, filterAssociations, filtersApplied, filtersRegistered]);

  /**
   * If the request to select all filters is set from the program, set all active states for all filters to true
   */
  useEffect(() => {
    if(selectAll && filtersRegistered) {
      for(const type of validNodeTypes) {
        setFilterActiveState(type, true);
      }
      setFiltersApplied(false);
      setSelectAll(false);
    }
  }, [filtersRegistered, selectAll, setFilterActiveState]);

  /**
   * If the request to select no filters is set from the program, set all active states for all filters to false
   */
  useEffect(() => {
    if(selectNone && filtersRegistered) {
      for(const type of validNodeTypes) {
        setFilterActiveState(type, true);
      }
      setFiltersApplied(false);
      setSelectNone(false);
    }
  }, [filtersRegistered, selectNone, setFilterActiveState]);

  useEffect(() => {
    setFiltersApplied(false);
  }, [nodeData]);

  return [
    filteredNodes,
    filtersApplied,
    setFiltersApplied,
    setNodeData,
    setNewFilterActiveStatus,
    setSelectAll,
    setSelectNone
  ];
};
