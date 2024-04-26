import React, {useCallback, useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import {NodeTypes, ValidNodeTypesList} from "common/src/map/MapNodeType.ts";
import FilterManager, {FilterValueType, generateFilterValue} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";

export interface IFilterState {
  filterValue: FilterValueType;
  renderInfo?: IRenderInfo
  active: boolean;
}

export interface IRenderInfo {
  filterType: NodeTypes;
  iconColor: string;
  filterName: string;
}

const filterRenderInfo: Map<NodeTypes, IRenderInfo> = new Map([
  [NodeTypes.CONF, {
    iconColor: "#1CA7EC",
    filterName: "Conference",
    filterType: NodeTypes.CONF,
  }],
  [NodeTypes.DEPT, {
    iconColor: "#72c41c",
    filterName: "Department",
    filterType: NodeTypes.DEPT,
  }],
  [NodeTypes.LABS, {
    iconColor: "#e88911",
    filterName: "Labs",
    filterType: NodeTypes.LABS,
  }],
  [NodeTypes.SERV, {
    iconColor: "#e88911",
    filterName: "Service",
    filterType: NodeTypes.SERV,
  }],
  [NodeTypes.INFO, {
    iconColor: "#1CA7EC",
    filterName: "Info",
    filterType: NodeTypes.INFO,
  }],
  [NodeTypes.REST, {
    iconColor: "#72c41c",
    filterName: "Restrooms",
    filterType: NodeTypes.REST,
  }],
  [NodeTypes.RETL, {
    iconColor: "#e88911",
    filterName: "Retail",
    filterType: NodeTypes.RETL,
  }],
  [NodeTypes.STAI, {
    iconColor: "#72c41c",
    filterName: "Stairs",
    filterType: NodeTypes.STAI
  }],
  [NodeTypes.ELEV, {
    iconColor: "#1CA7EC",
    filterName: "Elevators",
    filterType: NodeTypes.ELEV,
  }],
  [NodeTypes.EXIT, {
    iconColor: "red",
    filterName: "Exits",
    filterType: NodeTypes.EXIT,
  }]
]);

export const useFilters = (): [
  MapNode[],
  boolean,
  Map<NodeTypes, IFilterState>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<MapNode[]>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<{
    type: NodeTypes,
    active: boolean
  } | null>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [nodeData, setNodeData] = useState<MapNode[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);

  const [filterAssociations, setFilterAssociations] = useState<Map<NodeTypes, IFilterState>>(new Map());
  const [filtersRegistered, setFiltersRegistered] = useState<boolean>(false);

  const [newFilterActiveStatus, setNewFilterActiveStatus] = useState<{type: NodeTypes, active: boolean} | null>(null);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNone, setSelectNone] = useState<boolean>(false);

  /**
   * Helper callback function that sets a given filter association's active status to the passed in status
   */
  const setFilterActiveState = useCallback((nodeType: NodeTypes, newActiveStatus: boolean) => {
    const newFilterState: IFilterState | undefined = filterAssociations.get(nodeType);
    const oldFilterAssociations = filterAssociations;

    if(newFilterState) {
      newFilterState.active = newActiveStatus;
      console.log(newFilterState);
      oldFilterAssociations.set(nodeType, newFilterState);
      setFilterAssociations(oldFilterAssociations);
      setFiltersApplied(false);
    }
  }, [filterAssociations]);

  /**
   * If filters have not been generated for all node types yet, generate them
   */
  useEffect(() => {
    if(!filtersRegistered) {
      console.log("Registering filters");
      const newRegisteredFilters: Map<NodeTypes, IFilterState> = new Map<NodeTypes, IFilterState>();
      for(const type of ValidNodeTypesList) {
        newRegisteredFilters.set(type, {
          filterValue: generateFilterValue(false, type),
          renderInfo: filterRenderInfo.get(type),
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
        console.log(`Received new state for filter type ${newFilterActiveStatus.type}`);
        setFilterActiveState(newFilterActiveStatus.type, newFilterActiveStatus.active);
      }
    }
  }, [filterAssociations, filtersRegistered, newFilterActiveStatus, setFilterActiveState]);

  /**
   * If filters are registered, not applied, and the data is loaded, calculate the set of filtered nodes
   */
  useEffect(() => {
    console.log(`filtersRegistered: ${filtersRegistered} | nodeDataLoaded: ${nodeDataLoaded}`);
    if(!filtersApplied && filtersRegistered && nodeDataLoaded) {
      console.log("Reapplying filters to node data");
      const activeFilterValues: FilterValueType[] = [];

      for(const filterState of filterAssociations.values()) {
        if(filterState.active) activeFilterValues.push(filterState.filterValue);
      }

      const typeFilter: Filter = FilterManager.getInstance().getConfiguredFilter(FilterName.TYPE, activeFilterValues)!;

      const filteredNodes: MapNode[] = FilterManager.getInstance().applyFilters([typeFilter], nodeData);

      setFilteredNodes(filteredNodes);
      setFiltersApplied(true);
    }
  }, [nodeData, filterAssociations, filtersRegistered, nodeDataLoaded, filtersApplied]);

  /**
   * If the request to select all filters is set from the program, set all active states for all filters to true
   */
  useEffect(() => {
    if(selectAll && filtersRegistered) {
      for(const type of ValidNodeTypesList) {
        setFilterActiveState(type, true);
      }
      setSelectAll(false);
    }
  }, [filtersRegistered, selectAll, setFilterActiveState]);

  /**
   * If the request to select no filters is set from the program, set all active states for all filters to false
   */
  useEffect(() => {
    if(selectNone && filtersRegistered) {
      for(const type of ValidNodeTypesList) {
        setFilterActiveState(type, true);
      }
      setSelectNone(false);
    }
  }, [filtersRegistered, selectNone, setFilterActiveState]);

  useEffect(() => {
    console.log(`FiltersApplied: ${filtersApplied}`);
  }, [filtersApplied]);

  return [
    filteredNodes,
    filtersApplied,
    filterAssociations,
    setFiltersApplied,
    setNodeData,
    setNodeDataLoaded,
    setNewFilterActiveStatus,
    setSelectAll,
    setSelectNone
  ];
};
