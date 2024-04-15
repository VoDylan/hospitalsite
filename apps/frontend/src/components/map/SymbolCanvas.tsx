import React, {useEffect} from "react";
import MapNode from "common/src/map/MapNode.ts";
import {Draw} from "../../common/Draw.ts";
import FilterManager, {generateFilterValue} from "common/src/filter/FilterManager.ts";
import {FilterName} from "common/src/filter/FilterName.ts";
import Filter from "common/src/filter/filters/Filter.ts";
import {Floor} from "common/src/map/Floor.ts";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";

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

  useEffect(() => {
    initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.height, props.width]);

  /**
   * useEffect hook to render the map legend symbols onto the corresponding canvas
   */
  useEffect(() => {
    if (canvasRef.current && props.filtersApplied) {
      console.log("Rendering symbol canvas");
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      const draw = new Draw(ctx);

      ctx.clearRect(0, 0, props.width, props.height);

      //Filter for all nodes on the floor
      const filters: Filter =
        FilterManager.getInstance().getConfiguredFilter(FilterName.FLOOR, [
          generateFilterValue(false, props.floor),
        ])!;

      //Apply the filters to the list of nodes that have the selected filters applied, so only the nodes that the user wants
      //are displayed
      const nodesOnFloor: MapNode[] = FilterManager.getInstance().applyFilters(
        [filters],
        props.filteredNodes,
      );

      console.log("NodesOnFloor:");
      console.log(nodesOnFloor);

      for (let i = 0; i < nodesOnFloor.length; i++) {
        switch (nodesOnFloor[i].nodeType) {
          case "ELEV":
            draw.drawRectangle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              20,
              20,
              "#1CA7EC",
              "black",
              2,
            );
            break;
          case "STAI":
            draw.drawRectangle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              20,
              20,
              "#72c41c",
              "black",
              2,
            );
            break;
          case "EXIT":
            draw.drawRectangle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              20,
              20,
              "red",
              "black",
              2,
            );
            break;
          case "RETL":
            draw.drawRectangle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              20,
              20,
              "#e88911",
              "black",
              2,
            );
            break;
          case "SERV":
            draw.drawCircle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              12,
              "#e88911",
              "black",
              4,
            );
            break;
          case "INFO":
            draw.drawCircle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              12,
              "#1CA7EC",
              "black",
              4,
            );
            break;
          case "REST":
            draw.drawCircle(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              12,
              "#72c41c",
              "black",
              4,
            );
            break;
          case "CONF":
            draw.drawPentagon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              15,
              "#1CA7EC",
              "black",
              4,
            );
            break;
          case "DEPT":
            draw.drawPentagon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              15,
              "#72c41c",
              "black",
              4,
            );
            break;
          case "LABS":
            draw.drawPentagon(
              nodesOnFloor[i].xcoord,
              nodesOnFloor[i].ycoord,
              15,
              "#e88911",
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
  }, [props.filtersApplied, props.filteredNodes, props.floor, props.height, props.width]);

  return (
    <canvas
      ref={canvasRef}
      style={props.style}
    />
  );
}
