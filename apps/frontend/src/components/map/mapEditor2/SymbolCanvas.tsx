import React, { useEffect, useState } from "react";
import MapNode from "common/src/map/MapNode.ts";
import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import { Floor } from "common/src/map/Floor.ts";
import {FilterType} from "../../../common/types/FilterType.ts";
import {IFilterState, IRenderInfo} from "../../../hooks/useFilters.tsx";
import {Box} from "@mui/material";
import {getNodeTypeFromStr, NodeType} from "common/src/map/MapNodeType.ts";

interface SymbolCanvasProps {
  backgroundRendered: boolean;
  width: number;
  height: number;
  filterInfo: Map<FilterType, IFilterState>;
  filteredNodes: MapNode[];
  floor: Floor;
}

export default function SymbolCanvas(props: SymbolCanvasProps) {
  const [nodesOnFloor, setNodesOnFloor] = useState<MapNode[]>([]);
  const [width, setWidth] = useState<number>(props.width);
  const [height, setHeight] = useState<number>(props.height);
  const [filterInfo, setFilterInfo] = useState<Map<FilterType, IFilterState>>(props.filterInfo);

  useEffect(() => {
    setWidth(props.width);
  }, [props.width]);

  useEffect(() => {
    setHeight(props.height);
  }, [props.height]);

  useEffect(() => {
    setFilterInfo(props.filterInfo);
  }, [props.filterInfo]);

  useEffect(() => {
    if (props.backgroundRendered) {
      const filters: Filter = FilterManager.getInstance().getConfiguredFilter(
        FilterName.FLOOR,
        [generateFilterValue(false, props.floor)],
      )!;

      const nodesOnFloor: MapNode[] = FilterManager.getInstance().applyFilters(
        [filters],
        props.filteredNodes,
      );

      setNodesOnFloor(nodesOnFloor);
    }
  }, [props.backgroundRendered, props.filteredNodes, props.floor]);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      {nodesOnFloor.map((node) => {
        const nodeTypeObj: NodeType | undefined = getNodeTypeFromStr(node.nodeType);
        if(nodeTypeObj) {
          const renderInfo: IRenderInfo | undefined = filterInfo.get(nodeTypeObj)!.renderInfo;
          if(renderInfo)
            return (
              <img
                alt={node.nodeType}
                src={renderInfo.img}
                style={{
                  position: "absolute",
                  top: node.ycoord,
                  left: node.xcoord,
                }}
              />
            );
          return <></>;
        }
        return <></>;
      })}
    </Box>
  );
}
