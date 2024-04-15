import React, {useEffect, useRef} from "react";
import {Floor, floorStrToObj} from "common/src/map/Floor.ts";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";
import {IDCoordinates} from "common/src/IDCoordinates.ts";
import MapNode from "common/src/map/MapNode.ts";
import GraphManager from "../../common/GraphManager.ts";

interface PathCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  floor: Floor;
  pathNodesData: IDCoordinates[];
  floorConnectionCallback: (nodesToNextFloor: Map<IDCoordinates, Floor>, nodesToPrevFloor: Map<IDCoordinates, Floor>) => void;
  pathRenderStatusCallback: (status: boolean) => void;
}

export default function PathCanvas(props: PathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animationFrameRequestID = useRef<number>();

  const floorConnectionCallback = props.floorConnectionCallback;

  const pathRenderStatusCallback = props.pathRenderStatusCallback;

  useEffect(() => {
    initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.height, props.width]);

  useEffect(() => {
    if(animationFrameRequestID.current) cancelAnimationFrame(animationFrameRequestID.current);
    console.log("Determining nodes on floor...");
    const includedPathsOnFloor: IDCoordinates[][] = [];

    let currPath: IDCoordinates[] = [];

    const nodesToPrevFloor: Map<IDCoordinates, Floor> = new Map<IDCoordinates, Floor>();
    const nodesToNextFloor: Map<IDCoordinates, Floor> = new Map<IDCoordinates, Floor>();

    let lastVisitedFloor: Floor | null = null;

    for (let i = 0; i < props.pathNodesData.length; i++) {
      const node: MapNode | null = GraphManager.getInstance().getNodeByID(props.pathNodesData[i].nodeID);
      if(!node) continue;

      if (node.floor == props.floor) {
        lastVisitedFloor = floorStrToObj(node.floor);
        currPath.push(props.pathNodesData[i]);
      } else {
        if(lastVisitedFloor && lastVisitedFloor !== node.floor) {
          nodesToNextFloor.set(currPath[currPath.length - 1], floorStrToObj(node.floor)!);
          nodesToPrevFloor.set(props.pathNodesData[i], lastVisitedFloor);
          lastVisitedFloor = floorStrToObj(node.floor);
        }

        if (currPath.length != 0) {
          includedPathsOnFloor.push(currPath);
          currPath = [];
        }
      }
    }

    if (currPath.length != 0) includedPathsOnFloor.push(currPath);

    console.log(`Determined nodes on floor`);
    console.log(includedPathsOnFloor);

    console.log(nodesToNextFloor);
    console.log(nodesToPrevFloor);

    floorConnectionCallback(nodesToNextFloor, nodesToPrevFloor);
    pathRenderStatusCallback(true);

    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(0, 0, props.width, props.height);

      if (includedPathsOnFloor.length != 0) {
        console.log("Processing canvas");
        if (!props.pathNodesData) {
          return;
        }

        let currentTargetIndex = 0;
        let currentPathIndex = 0;
        let currentX =
          includedPathsOnFloor[currentPathIndex][currentTargetIndex]
            .coordinates.x;
        let currentY =
          includedPathsOnFloor[currentPathIndex][currentTargetIndex]
            .coordinates.y;
        const speed = 1;

        const moveDot = (origFloor: Floor) => {
          //console.log(`Current Floor: ${props.floor} | Original Floor: ${origFloor}`);
          if (props.floor != origFloor) {
            console.log("Floor changed, stopping previous animation");
            return;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "black";

          for (let i = 0; i < includedPathsOnFloor.length; i++) {
            for (let j = 0; j < includedPathsOnFloor[i].length; j++) {
              ctx.beginPath();
              ctx.arc(
                includedPathsOnFloor[i][j].coordinates.x,
                includedPathsOnFloor[i][j].coordinates.y,
                5,
                0,
                2 * Math.PI,
              );
              ctx.fill();
            }
          }

          ctx.lineWidth = 3;
          ctx.beginPath();

          for (let i = 0; i < includedPathsOnFloor.length; i++) {
            ctx.moveTo(
              includedPathsOnFloor[i][0].coordinates.x,
              includedPathsOnFloor[i][0].coordinates.y,
            );
            for (let j = 1; j < includedPathsOnFloor[i].length; j++) {
              ctx.lineTo(
                includedPathsOnFloor[i][j].coordinates.x,
                includedPathsOnFloor[i][j].coordinates.y,
              );
            }
          }

          ctx.stroke();

          ctx.fillStyle = "blue";
          ctx.beginPath();
          ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
          ctx.fill();

          const dx =
            includedPathsOnFloor[currentPathIndex][currentTargetIndex]
              .coordinates.x - currentX;
          const dy =
            includedPathsOnFloor[currentPathIndex][currentTargetIndex]
              .coordinates.y - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < speed) {
            currentTargetIndex =
              (currentTargetIndex + 1) %
              includedPathsOnFloor[currentPathIndex].length;
          } else {
            currentX += (dx / distance) * speed;
            currentY += (dy / distance) * speed;
          }
          if (currentTargetIndex === 0) {
            currentPathIndex =
              (currentPathIndex + 1) % includedPathsOnFloor.length;
            currentX =
              includedPathsOnFloor[currentPathIndex][currentTargetIndex]
                .coordinates.x;
            currentY =
              includedPathsOnFloor[currentPathIndex][currentTargetIndex]
                .coordinates.y;
            currentTargetIndex = 1;
          }
          animationFrameRequestID.current = requestAnimationFrame(() => moveDot(origFloor));
        };
        requestAnimationFrame(() => moveDot(props.floor));
      } else {
        console.log("Clearing path canvas");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [floorConnectionCallback, pathRenderStatusCallback, props.floor, props.height, props.pathNodesData, props.width]);

  return (
    <canvas
      ref={canvasRef}
      style={props.style}
    />
  );
}
