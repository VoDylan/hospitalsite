import React, {useEffect, useRef, useState} from "react";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";
import {Floor} from "common/src/map/Floor.ts";
import {nodesDistances} from "common/src/nodesDistances.ts";
import axios from "axios";

interface EdgeCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  floor: Floor;
  nodeDataLoaded: boolean;
}

export default function EdgeCanvas(props: EdgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);
  const [edgeDataLoaded, setEdgeDataLoaded] = useState<boolean>(false);

  async function loadEdgesDistance(request: {req: string}) {
    // const req = { req: "L1" };
    const distancesResponse = await axios.post("/api/sendDistances", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;

    setDistancesData(distanceData);
    // console.log("Updated distancesData:", distancePath);
  }

  useEffect(() => {
    if(props.backgroundRendered) initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.backgroundRendered, props.height, props.width]);

  useEffect(() => {
    loadEdgesDistance({req: props.floor}).then(() => setEdgeDataLoaded(true));
  }, [props.floor, props.nodeDataLoaded]);

  useEffect(() => {
    if (edgeDataLoaded && canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if(!ctx) return;

      ctx.clearRect(0, 0, props.width, props.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.font = "15px Arial";

      for (let i = 0; i < distancesData.length; i++) {
        if (distancesData[i]) {
          ctx.beginPath();
          ctx.moveTo(
            distancesData[i].startCoords.x,
            distancesData[i].startCoords.y,
          );
          ctx.lineTo(
            distancesData[i].endCoords.x,
            distancesData[i].endCoords.y,
          );
          ctx.stroke();
          ctx.closePath();

          ctx.fillText(
            distancesData[i].distance.toString(),
            (distancesData[i].startCoords.x + distancesData[i].endCoords.x) /
              2,
            (distancesData[i].startCoords.y + distancesData[i].endCoords.y) /
              2,
          );
        }
      }
    }
  }, [distancesData, edgeDataLoaded, props.height, props.nodeDataLoaded, props.width]);

  return (
    <canvas
      ref={canvasRef}
      style={props.style}
    />
  );
}
