import React, {useCallback, useEffect, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import {NodeTypes} from "common/src/map/MapNodeType.ts";
import FilterManager, {FilterValueType, generateFilterValue} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";

import elevatorImage from "../images/realMapIcons/elevator.svg";
import deptImage from "../images/realMapIcons/dept.svg";
import labsImage from "../images/realMapIcons/labs.svg";
import stairsImage from "../images/realMapIcons/stairs.svg";
import bathroomImage from "../images/realMapIcons/bathrom.svg";
import serviceImage from "../images/realMapIcons/service.svg";
import retailImage from "../images/realMapIcons/retail.png";
import infoImage from "../images/realMapIcons/info.svg";
import confImage from "../images/realMapIcons/conf.png";
import exitImage from "../images/realMapIcons/exit.png";
import hallImage from "../images/realMapIcons/hall.svg";
import {FilterType, ValidFilterTypeList} from "../common/types/FilterType.ts";
// import floorImage from "../../../images/realMapIcons/floors.png";

export interface IFilterState {
  filterValue: FilterValueType;
  renderInfo?: IRenderInfo
  active: boolean;
}

export interface IRenderInfo {
  filterType: FilterType;
  iconColor: string;
  filterName: string;
  img: string;
}

const filterRenderInfo: Map<FilterType, IRenderInfo> = new Map([
  [NodeTypes.CONF, {
    iconColor: "#1CA7EC",
    filterName: "Conference",
    filterType: NodeTypes.CONF,
    img: confImage,
  }],
  [NodeTypes.DEPT, {
    iconColor: "#72c41c",
    filterName: "Department",
    filterType: NodeTypes.DEPT,
    img: deptImage,
  }],
  [NodeTypes.LABS, {
    iconColor: "#e88911",
    filterName: "Labs",
    filterType: NodeTypes.LABS,
    img: labsImage,
  }],
  [NodeTypes.SERV, {
    iconColor: "#e88911",
    filterName: "Service",
    filterType: NodeTypes.SERV,
    img: serviceImage,
  }],
  [NodeTypes.INFO, {
    iconColor: "#1CA7EC",
    filterName: "Info",
    filterType: NodeTypes.INFO,
    img: infoImage,
  }],
  [NodeTypes.REST, {
    iconColor: "#72c41c",
    filterName: "Restrooms",
    filterType: NodeTypes.REST,
    img: bathroomImage,
  }],
  [NodeTypes.RETL, {
    iconColor: "#e88911",
    filterName: "Retail",
    filterType: NodeTypes.RETL,
    img: retailImage,
  }],
  [NodeTypes.STAI, {
    iconColor: "#72c41c",
    filterName: "Stairs",
    filterType: NodeTypes.STAI,
    img: stairsImage,
  }],
  [NodeTypes.ELEV, {
    iconColor: "#1CA7EC",
    filterName: "Elevators",
    filterType: NodeTypes.ELEV,
    img: elevatorImage,
  }],
  [NodeTypes.EXIT, {
    iconColor: "red",
    filterName: "Exits",
    filterType: NodeTypes.EXIT,
    img: exitImage,
  }],
  [NodeTypes.HALL, {
    iconColor: "#7e36c2",
    filterName: "Hall",
    filterType: NodeTypes.HALL,
    img: hallImage,
  }]
]);

export const useFilters = (includeHalls: boolean): [
  MapNode[],
  boolean,
  Map<FilterType, IFilterState>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<MapNode[]>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<{
    type: FilterType,
    active: boolean
  } | null>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [nodeData, setNodeData] = useState<MapNode[]>([]);
  const [nodeDataLoaded, setNodeDataLoaded] = useState<boolean>(false);

  const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
  const [filteredNodes, setFilteredNodes] = useState<MapNode[]>([]);

  const [filterAssociations, setFilterAssociations] = useState<Map<FilterType, IFilterState>>(new Map());
  const [filtersRegistered, setFiltersRegistered] = useState<boolean>(false);

  const [newFilterActiveStatus, setNewFilterActiveStatus] = useState<{type: FilterType, active: boolean} | null>(null);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNone, setSelectNone] = useState<boolean>(false);

  /**
   * Helper callback function that sets a given filter association's active status to the passed in status
   */
  const setFilterActiveState = useCallback((filterType: FilterType, newActiveStatus: boolean) => {
    const newFilterState: IFilterState | undefined = filterAssociations.get(filterType);
    const oldFilterAssociations = filterAssociations;

    if(newFilterState) {
      newFilterState.active = newActiveStatus;
      console.log(newFilterState);
      oldFilterAssociations.set(filterType, newFilterState);
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
      const newRegisteredFilters: Map<FilterType, IFilterState> = new Map<FilterType, IFilterState>();
      for(const type of ValidFilterTypeList) {
        if(!includeHalls && (type == NodeTypes.HALL)) continue;
        newRegisteredFilters.set(type, {
          filterValue: generateFilterValue(false, type),
          renderInfo: filterRenderInfo.get(type),
          active: true,
        });
      }

      setFilterAssociations(newRegisteredFilters);
      setFiltersRegistered(true);
    }
  }, [filtersRegistered, includeHalls]);

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
      for(const type of ValidFilterTypeList) {
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
      for(const type of ValidFilterTypeList) {
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
