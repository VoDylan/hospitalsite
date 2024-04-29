import React, {useEffect, useRef, useState} from "react";
import MapNode from "common/src/map/MapNode.ts";
import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import { Floor } from "common/src/map/Floor.ts";
import {FilterType} from "../../../common/types/FilterType.ts";
import {IFilterState, IRenderInfo} from "../../../hooks/useFilters.tsx";
import {getNodeTypeFromStr, NodeType} from "common/src/map/MapNodeType.ts";
import MapIcon from "./MapIcon.tsx";
import {ReactZoomPanPinchState} from "react-zoom-pan-pinch";

interface SymbolCanvasProps {
  backgroundRendered: boolean;
  filterInfo: Map<FilterType, IFilterState>;
  filteredNodes: MapNode[];
  floor: Floor;
  selectNodeGeneral: (node: MapNode) => void;
  deselectNodeGeneral: (node: MapNode) => void;
  selectedNode1: MapNode | null;
  selectedNode2: MapNode | null;
  handleNodeCreationRequest: (event: React.MouseEvent, boundingElementRef: React.MutableRefObject<HTMLDivElement | null>) => void;
  transformState: ReactZoomPanPinchState;
  setDataLoadedSoft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SymbolCanvas(props: SymbolCanvasProps) {
  const [nodesOnFloor, setNodesOnFloor] = useState<MapNode[]>([]);
  const [filterInfo, setFilterInfo] = useState<Map<FilterType, IFilterState>>(props.filterInfo);

  const boundingBoxRef = useRef<HTMLDivElement>(null);

  const usedKeys = useRef<number[]>([]);

  const newKeys = useRef<number[]>([]);

  const getNewKey = (): number => {
    let newKey: number = Math.random();
    let foundUnique: boolean = false;
    while (!foundUnique) {
      const keyAlreadyUsed = usedKeys.current.find((key) => {
        return key == newKey;
      });

      if(!keyAlreadyUsed) {
        foundUnique = true;
      } else {
        newKey = Math.random();
      }
    }

    newKeys.current.push(newKey);

    return newKey;
  };

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

      nodesOnFloor.forEach((node: MapNode) => {
        console.log(node.floor);
      });
      setNodesOnFloor(nodesOnFloor);
    }
  }, [props.backgroundRendered, props.filteredNodes, props.floor]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      ref={boundingBoxRef}
      onDoubleClick={(event: React.MouseEvent) => props.handleNodeCreationRequest(event, boundingBoxRef)}
    >
      {nodesOnFloor.map((node, index: number, array ) => {
        const nodeTypeObj: NodeType | undefined = getNodeTypeFromStr(node.nodeType);
        if(nodeTypeObj) {
          const renderInfo: IRenderInfo | undefined = filterInfo.get(nodeTypeObj)!.renderInfo;
          if(renderInfo) {
            const key: number = getNewKey();

            if(index >= array.length - 1) {
              usedKeys.current = newKeys.current;
              newKeys.current = [];
            }

            return (
              <MapIcon
                node={node}
                renderInfo={renderInfo}
                selectNodeGeneral={props.selectNodeGeneral}
                deselectNodeGeneral={props.deselectNodeGeneral}
                selectedNode1={props.selectedNode1}
                selectedNode2={props.selectedNode2}
                transformState={props.transformState}
                setDataLoadedSoft={props.setDataLoadedSoft}
                key={key}
              />
            );
          }
        }
        return <></>;
      })}
    </div>
  );
}
