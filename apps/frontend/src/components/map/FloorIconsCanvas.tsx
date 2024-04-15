import React, {useEffect, useState} from "react";
import {Floor} from "common/src/map/Floor.ts";
import {IDCoordinates} from "common/src/IDCoordinates.ts";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";
import {Draw} from "../../common/Draw.ts";
import L1FloorIconNextSrc from "../../images/mapIcons/L1FloorMarkerNextIcon.png";
import L1FloorIconPrevSrc from "../../images/mapIcons/L1FloorMarkerPrevIcon.png";
import L2FloorIconNextSrc from "../../images/mapIcons/L2FloorMarkerNextIcon.png";
import L2FloorIconPrevSrc from "../../images/mapIcons/L2FloorMarkerPrevIcon.png";
import F1FloorIconNextSrc from "../../images/mapIcons/F1FloorMarkerNextIcon.png";
import F1FloorIconPrevSrc from "../../images/mapIcons/F1FloorMarkerPrevIcon.png";
import F2FloorIconNextSrc from "../../images/mapIcons/F2FloorMarkerNextIcon.png";
import F2FloorIconPrevSrc from "../../images/mapIcons/F2FloorMarkerPrevIcon.png";
import F3FloorIconNextSrc from "../../images/mapIcons/F3FloorMarkerNextIcon.png";
import F3FloorIconPrevSrc from "../../images/mapIcons/F3FloorMarkerPrevIcon.png";
import GraphManager from "../../common/GraphManager.ts";

interface FloorIconsCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  pathRendered: boolean;
  width: number;
  height: number;
  floor: Floor;
  nodesToNextFloor: Map<IDCoordinates, Floor>;
  nodesToPrevFloor: Map<IDCoordinates, Floor>;
}

export default function FloorIconsCanvas(props: FloorIconsCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [L1FloorIconNext] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = L1FloorIconNextSrc;
    return img;
  });

  const [L1FloorIconPrev] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = L1FloorIconPrevSrc;
    return img;
  });

  const [L2FloorIconNext] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = L2FloorIconNextSrc;
    return img;
  });

  const [L2FloorIconPrev] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = L2FloorIconPrevSrc;
    return img;
  });

  const [F1FloorIconNext] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F1FloorIconNextSrc;
    return img;
  });

  const [F1FloorIconPrev] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F1FloorIconPrevSrc;
    return img;
  });

  const [F2FloorIconNext] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F2FloorIconNextSrc;
    return img;
  });

  const [F2FloorIconPrev] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F2FloorIconPrevSrc;
    return img;
  });

  const [F3FloorIconNext] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F3FloorIconNextSrc;
    return img;
  });

  const [F3FloorIconPrev] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = F3FloorIconPrevSrc;
    return img;
  });

  useEffect(() => {
    initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.height, props.width]);

  useEffect(() => {
    const floorToNextIcon = (floor: Floor) => {
      switch(floor) {
        case Floor.L1:
          return L1FloorIconNext;
        case Floor.L2:
          return L2FloorIconNext;
        case Floor.F1:
          return F1FloorIconNext;
        case Floor.F2:
          return F2FloorIconNext;
        case Floor.F3:
          return F3FloorIconNext;
      }
    };

    const floorToPrevIcon = (floor: Floor) => {
      switch(floor) {
        case Floor.L1:
          return L1FloorIconPrev;
        case Floor.L2:
          return L2FloorIconPrev;
        case Floor.F1:
          return F1FloorIconPrev;
        case Floor.F2:
          return F2FloorIconPrev;
        case Floor.F3:
          return F3FloorIconPrev;
      }
    };

    if(canvasRef.current && props.backgroundRendered && props.pathRendered) {
      console.log("Rendering floor icons");
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if(!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const draw: Draw = new Draw(ctx);

      props.nodesToNextFloor.forEach((value: Floor, key: IDCoordinates) => {
        if(GraphManager.getInstance().getNodeByID(key.nodeID)!.floor == props.floor)
          draw.drawFloorIcon(key.coordinates.x, key.coordinates.y, 1/3, floorToNextIcon(value));
      });

      props.nodesToPrevFloor.forEach((value: Floor, key: IDCoordinates) => {
        if(GraphManager.getInstance().getNodeByID(key.nodeID)!.floor == props.floor)
          draw.drawFloorIcon(key.coordinates.x, key.coordinates.y, 1/3, floorToPrevIcon(value));
      });
    }
  }, [F1FloorIconNext, F1FloorIconPrev, F2FloorIconNext, F2FloorIconPrev, F3FloorIconNext, F3FloorIconPrev, L1FloorIconNext, L1FloorIconPrev, L2FloorIconNext, L2FloorIconPrev, props.backgroundRendered, props.floor, props.nodesToNextFloor, props.nodesToPrevFloor, props.pathRendered]);

  return (
    <canvas
      ref={canvasRef}
      style={props.style}
    />
  );
};
