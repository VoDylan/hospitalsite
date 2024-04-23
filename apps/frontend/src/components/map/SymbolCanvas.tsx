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
import Retail from "../../images/realMapIcons/retail.png";
import Labs from "../../images/realMapIcons/labs.svg";
import Department from "../../images/realMapIcons/dept.svg";
import Exit from "../../images/realMapIcons/exit.png";

interface SymbolCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  filtersApplied: boolean;
  filteredNodes: MapNode[];
  floor: Floor;
}

export default function SymbolCanvas(props: SymbolCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [elevators] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Elevator;
    return img;
  });

  const [stairs] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Stairs;
    return img;
  });

  const [info] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Info;
    return img;
  });

  const [bathroom] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Bathroom;
    return img;
  });

  const [retail] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Retail;
    return img;
  });

  const [service] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Service;
    return img;
  });

  const [lab] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Labs;
    return img;
  });

  const [department] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Department;
    return img;
  });

  const [exit] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Exit;
    return img;
  });

  useEffect(() => {
    if (props.backgroundRendered)
      initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.backgroundRendered, props.height, props.width]);

  useEffect(() => {
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

      for (let i = 0; i < nodesOnFloor.length; i++) {
        switch (nodesOnFloor[i].nodeType) {
          case "ELEV":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
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
              0.1,
              exit
            );
            break;
          case "RETL":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
              retail
            );
            break;
          case "SERV":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              0.9,
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
              1,
              bathroom
            );
            break;
          case "CONF":
            draw.drawPentagon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              15,
              "#1CA7EC",
              "white",
              4,
            );
            break;
          case "DEPT":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
              department
            );
            break;
          case "LABS":
            draw.drawFloorIcon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              1,
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
  }, [props.filtersApplied, props.filteredNodes, props.floor, props.height, props.width, elevators, stairs, retail, service, info, bathroom, department, lab, exit]);

  return <canvas ref={canvasRef} style={props.style} />;
}
