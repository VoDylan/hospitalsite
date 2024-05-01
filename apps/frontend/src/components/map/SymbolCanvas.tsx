import React, { useEffect, useState } from "react";
import MapNode from "common/src/map/MapNode.ts";
import { Draw } from "../../common/Draw.ts";
import FilterManager, {
  generateFilterValue,
} from "common/src/filter/FilterManager.ts";
import { FilterName } from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import { Floor } from "common/src/map/Floor.ts";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";
import Elevator from "../../images/realMapIcons/elevator.svg";
import Stairs from "../../images/realMapIcons/stairs.svg";
import Info from "../../images/realMapIcons/info.svg";
import Bathroom from "../../images/realMapIcons/bathrom.svg";
import Service from "../../images/realMapIcons/service.svg";
import Retail from "../../images/realMapIcons/retail.svg";
import Labs from "../../images/realMapIcons/labs.svg";
import Department from "../../images/realMapIcons/dept.svg";
import Conference from "../../images/realMapIcons/conf.svg";
import Exit from "../../images/realMapIcons/exit.svg";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";

interface SymbolCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  filtersApplied: boolean;
  filteredNodes: MapNode[];
  pathNodes?: TypeCoordinates[]; // Make pathNodes optional
  floor: Floor;
  startNode?: string; // Make startNode optional
  endNode?: string; // Make endNode optional
}

export default function SymbolCanvas(props: SymbolCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Define state for image elements
  const [elevators] = useState<HTMLImageElement>(() => new Image());
  const [stairs] = useState<HTMLImageElement>(() => new Image());
  const [info] = useState<HTMLImageElement>(() => new Image());
  const [bathroom] = useState<HTMLImageElement>(() => new Image());
  const [retail] = useState<HTMLImageElement>(() => new Image());
  const [service] = useState<HTMLImageElement>(() => new Image());
  const [lab] = useState<HTMLImageElement>(() => new Image());
  const [department] = useState<HTMLImageElement>(() => new Image());
  const [conference] = useState<HTMLImageElement>(() => new Image());
  const [exit] = useState<HTMLImageElement>(() => new Image());

  useEffect(() => {
    // Assign src for image elements
    elevators.src = Elevator;
    stairs.src = Stairs;
    info.src = Info;
    bathroom.src = Bathroom;
    retail.src = Retail;
    service.src = Service;
    lab.src = Labs;
    department.src = Department;
    conference.src = Conference;
    exit.src = Exit;

    // Initialize canvas after background is rendered
    if (props.backgroundRendered && canvasRef.current) {
      initializeLayeredCanvas(
        canvasRef.current,
        props.width,
        props.height
      );
    }
  }, [bathroom, conference, department, elevators, exit, info, lab, props.backgroundRendered, props.height, props.width, retail, service, stairs]);

  useEffect(() => {
    // Render symbols when filters are applied
    if (canvasRef.current && props.filtersApplied) {
      console.log("Rendering symbol canvas");
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      const draw = new Draw(ctx);

      ctx.clearRect(0, 0, props.width, props.height);

      const filters: Filter = FilterManager.getInstance().getConfiguredFilter(
        FilterName.FLOOR,
        [generateFilterValue(false, props.floor)],
      )!;

      const nodesOnFloor: MapNode[] = FilterManager.getInstance().applyFilters(
        [filters],
        props.filteredNodes,
      );

      // Filter out nodes in path
      const nodesToRender: MapNode[] = [];

      if (props.pathNodes) { // Check if pathNodes is defined
        for (let i = 0; i < nodesOnFloor.length; i++) {
          const nodeOnFloor = nodesOnFloor[i];
          // Check if the nodeID of the current node is present in props.pathNodes
          const isInPath = props.pathNodes.some(pathNode =>
            pathNode.nodeID === nodeOnFloor.nodeID &&
            pathNode.nodeID !== props.startNode &&
            pathNode.nodeID !== props.endNode
          );
          // If the node is in pathNodes, add it to nodesToRender
          if (isInPath) {
            nodesToRender.push(nodeOnFloor);
          }
        }
      }

      for (let i = 0; i < nodesOnFloor.length; i++) {
        const nodeOnFloor = nodesOnFloor[i];
        const isInNodesToRender = nodesToRender.some(node => node.nodeID === nodeOnFloor.nodeID);
        // If the node is in nodesToRender, skip rendering
        if (isInNodesToRender) {
          continue;
        }
        switch (nodesOnFloor[i].nodeType) {
          // Handle different node types
          case "ELEV":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.2,
              elevators
            );
            break;
          case "STAI":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
              stairs
            );
            break;
          case "EXIT":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              0.11,
              exit
            );
            break;
          case "RETL":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.2,
              retail
            );
            break;
          case "SERV":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
              service
            );
            break;
          case "INFO":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
              info
            );
            break;
          case "REST":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.1,
              bathroom
            );
            break;
          case "CONF":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.2,
              conference
            );
            break;
          case "DEPT":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.2,
              department
            );
            break;
          case "LABS":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1.12,
              lab
            );
            break;
          case "HALL":
            draw.drawCircle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              8,
              "#7e36c2",
              "black",
              4,
            );
            break;
          default:
            console.error("Unsupported nodeType");
            break;
        }
      }
    }
  }, [props.filtersApplied, props.filteredNodes, props.floor, props.height, props.width, elevators, stairs, retail, service, info, bathroom, department, lab, exit, conference, props.pathNodes, props.startNode, props.endNode]);

  return <canvas ref={canvasRef} style={props.style} />;
}
