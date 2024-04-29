import React, { useEffect, useRef } from "react";
import { Floor, floorStrToObj } from "common/src/map/Floor.ts";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";
// import { IDCoordinates } from "common/src/IDCoordinates.ts";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import MapNode from "common/src/map/MapNode.ts";
import GraphManager from "../../common/GraphManager.ts";

interface PathCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  updateNodesBetweenFloors: boolean;
  width: number;
  height: number;
  floor: Floor;
  pathNodesData: TypeCoordinates[];
  floorConnectionCallback: (
    nodesToNextFloor: Map<TypeCoordinates, Floor>,
    nodesToPrevFloor: Map<TypeCoordinates, Floor>,
  ) => void;
  pathRenderStatusCallback: (status: boolean) => void;
  startNode: string;
  endNode: string;
  iconCanvasRef: HTMLCanvasElement;

}

export default function PathCanvas(props: PathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRequestID = useRef<number>();

  const floorConnectionCallback = props.floorConnectionCallback;
  // const pathRenderStatusCallback = props.pathRenderStatusCallback;

  useEffect(() => {
    if (props.backgroundRendered)
      initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.backgroundRendered, props.height, props.width]);

  useEffect(() => {
    if (props.updateNodesBetweenFloors) {
      if (!props.pathNodesData || props.pathNodesData.length == 0) return;
      console.log("Determining interfloor nodes");

      const nodesToPrevFloor: Map<TypeCoordinates, Floor> = new Map<
        TypeCoordinates,
        Floor
      >();
      const nodesToNextFloor: Map<TypeCoordinates, Floor> = new Map<
        TypeCoordinates,
        Floor
      >();

      let lastVisitedFloor: Floor = floorStrToObj(
        GraphManager.getInstance().getNodeByID(props.pathNodesData[0].nodeID)!
          .floor,
      )!;
      let lastVisitedNode: TypeCoordinates = props.pathNodesData[0];

      for (let i = 0; i < props.pathNodesData.length; i++) {
        const node: MapNode | null = GraphManager.getInstance().getNodeByID(
          props.pathNodesData[i].nodeID,
        );
        if (!node) continue;

        if (node.floor != lastVisitedFloor) {
          nodesToNextFloor.set(lastVisitedNode, floorStrToObj(node.floor)!);
          nodesToPrevFloor.set(props.pathNodesData[i], lastVisitedFloor);
        }

        lastVisitedFloor = floorStrToObj(node.floor)!;
        lastVisitedNode = props.pathNodesData[i];
      }

      floorConnectionCallback(nodesToNextFloor, nodesToPrevFloor);
    }
  }, [
    floorConnectionCallback,
    props.pathNodesData,
    props.updateNodesBetweenFloors,
  ]);

  useEffect(() => {
    if (animationFrameRequestID.current)
      cancelAnimationFrame(animationFrameRequestID.current);

    if (!props.pathNodesData) return;
    const includedPathsOnFloor: TypeCoordinates[][] = [];

    let currPath: TypeCoordinates[] = [];

    let lastVisitedFloor: Floor | null = null;

    for (let i = 0; i < props.pathNodesData.length; i++) {
      const node: MapNode | null = GraphManager.getInstance().getNodeByID(
        props.pathNodesData[i].nodeID,
      );
      if (!node) continue;

      if (node.floor == props.floor) {
        lastVisitedFloor = floorStrToObj(node.floor);
        currPath.push(props.pathNodesData[i]);
      } else {
        if (lastVisitedFloor && lastVisitedFloor !== node.floor) {
          lastVisitedFloor = floorStrToObj(node.floor);
        }

        if (currPath.length != 0) {
          includedPathsOnFloor.push(currPath);
          currPath = [];
        }
      }
    }

    if (currPath.length != 0) includedPathsOnFloor.push(currPath);

    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(0, 0, props.width, props.height);

      if (includedPathsOnFloor.length != 0) {
        console.log("Processing canvas");

        let currentTargetIndex = 0;
        let currentPathIndex = 0;
        let currentX =
          includedPathsOnFloor[currentPathIndex][currentTargetIndex].coordinates
            .x;
        let currentY =
          includedPathsOnFloor[currentPathIndex][currentTargetIndex].coordinates
            .y;
        const speed = 3;

        const moveDot = (origFloor: Floor) => {
          if (props.floor != origFloor) {
            console.log("Floor changed, stopping previous animation");
            return;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Node color
          ctx.fillStyle = "blue";

          for (let i = 0; i < includedPathsOnFloor.length; i++) {
            for (let j = 0; j < includedPathsOnFloor[i].length; j++) {
              ctx.beginPath();

              if (includedPathsOnFloor[i][j].nodeID === props.startNode) {
                // Check if it's the first element
                const image: HTMLImageElement | null =
                  document.querySelector(`.start`);
                if (!image) return;

                props.iconCanvasRef
                  .getContext("2d")!
                  .drawImage(
                    image,
                    includedPathsOnFloor[i][j].coordinates.x - 58,
                    includedPathsOnFloor[i][j].coordinates.y - 42,
                    110,
                    80,
                  );
              }

              if (includedPathsOnFloor[i][j].nodeID === props.endNode) {
                // Check if it's the last element
                const image2: HTMLImageElement | null =
                  document.querySelector(`.end`);
                if (!image2) return;

                props.iconCanvasRef
                  .getContext("2d")!
                  .drawImage(
                    image2,
                    includedPathsOnFloor[i][j].coordinates.x - 63,
                    includedPathsOnFloor[i][j].coordinates.y - 65,
                    180,
                    150,
                  ); // Adjust iconWidth and iconHeight as needed
              }

              ctx.arc(
                includedPathsOnFloor[i][j].coordinates.x,
                includedPathsOnFloor[i][j].coordinates.y,
                1,
                0,
                2 * Math.PI,
              );
              ctx.fill();
            }
          }

          // Path color
          ctx.strokeStyle = "#0F53FF";
          ctx.lineWidth = 8;
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

          // Dot color
          ctx.stroke();
          ctx.fillStyle = "#0F53FF";
          ctx.beginPath();
          ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI);
          ctx.fill();

          ctx.strokeStyle = "white"; // Set the stroke color to black
          ctx.lineWidth = 4; // Set the border width
          ctx.beginPath();
          ctx.arc(currentX, currentY, 14, 0, 2 * Math.PI);
          ctx.stroke();

          // Set the stroke color to blue with reduced opacity
          // Set the stroke color to light blue with reduced opacity
          ctx.strokeStyle = "rgba(15, 150, 220, 0.4)"; // Light blue with 60% opacity
          ctx.lineWidth = 9; // Set the border width
          ctx.beginPath();
          ctx.arc(currentX, currentY, 20, 0, 2 * Math.PI);
          ctx.stroke();

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
          animationFrameRequestID.current = requestAnimationFrame(() =>
            moveDot(origFloor),
          );
        };
        requestAnimationFrame(() => moveDot(props.floor));
      } else {
        console.log("Clearing path canvas");
        if (animationFrameRequestID.current)
          cancelAnimationFrame(animationFrameRequestID.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [
    props.endNode,
    props.floor,
    props.height,
    props.iconCanvasRef,
    props.pathNodesData,
    props.startNode,
    props.width,
  ]);

  return <canvas ref={canvasRef} style={props.style} />;
}
