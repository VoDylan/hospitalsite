import React, { useEffect, useRef, useState } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import { TextField, Button } from "@mui/material";
import "./map.css";
// import { Coordinates } from "common/src/Coordinates.ts";
import axios from "axios";
import { LocationInfo } from "common/src/LocationInfo.ts";
import { nodesDistances } from "common/src/nodesDistances.ts";
import { IDCoordinates } from "common/src/IDCoordinates.ts";

function MapTestingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]); // Declaring nodes state
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [nodesData, setNodesData] = useState<IDCoordinates[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);

  const handleStartNodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartNode(event.target.value);
  };

  const handleEndNodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndNode(event.target.value);
  };

  const updateNodesData = (newData: IDCoordinates[]) => {
    setNodesData(newData);
  };

  const updateDistancesData = (newData: nodesDistances[]) => {
    setDistancesData(newData);
  };

  async function handleSubmit() {
    if (startNode.trim() === "" || endNode.trim() === "") {
      // handles if one of them is empty
      setErrorMesage("Please enter both start and end nodes");
      return;
    }

    if (startNode === endNode) {
      setErrorMesage("Please enter different nodes");
      return;
    }

    const distancesResponse = await axios.post("/api/testPath", { req: "L1" });
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;
    console.log("distances", distanceData);
    updateDistancesData(distanceData);

    const algorithm: string = "A*";

    const request: LocationInfo = {
      algorithm: algorithm,
      startNode: startNode,
      endNode: endNode,
    };

    const response = await axios.post("/api/path", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.data;
    console.log(data);
    const path = data.message;
    // console.log(path);
    updateNodesData(path);
    // console.log(nodesArray);

    setNodes([startNode, endNode]);
    setErrorMesage("");
  }

  useEffect(() => {
    if (canvasRef.current) {
      // console.log("nodesData:", nodesData);
      // console.log("nodes:", nodes);

      // Checking if nodes have been set
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const image = new Image();
      image.src = MapImage;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (
          startNode.trim() === nodes[0] &&
          endNode.trim() === nodes[1] &&
          distancesData
        ) {
          if (!nodesData) {
            setErrorMesage("There is no path between nodes");
            return;
          }

          // animation
          let currentTargetIndex = 0;
          let currentX = nodesData[currentTargetIndex].coordinates.x;
          let currentY = nodesData[currentTargetIndex].coordinates.y;
          const speed = 1;

          const moveDot = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.font = "10px Arial";

            for (let i = 0; i < distancesData.length; i++) {
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
                (distancesData[i].startCoords.x +
                  distancesData[i].endCoords.x) /
                  2,
                (distancesData[i].startCoords.y +
                  distancesData[i].endCoords.y) /
                  2,
              );
            }

            ctx.fillStyle = "red";
            for (let i = 0; i < distancesData.length; i++) {
              ctx.beginPath();
              ctx.arc(
                distancesData[i].startCoords.x,
                distancesData[i].startCoords.y,
                5,
                0,
                2 * Math.PI,
              ); // draw circle
              ctx.arc(
                distancesData[i].endCoords.x,
                distancesData[i].endCoords.y,
                5,
                0,
                2 * Math.PI,
              ); // draw circle
              ctx.fill();
            }

            ctx.fillStyle = "blue";
            ctx.strokeStyle = "blue";
            for (let i = 0; i < nodesData.length; i++) {
              ctx.beginPath();
              ctx.arc(
                nodesData[i].coordinates.x,
                nodesData[i].coordinates.y,
                5,
                0,
                2 * Math.PI,
              ); // draw circle
              ctx.fill();
            }

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(nodesData[0].coordinates.x, nodesData[0].coordinates.y);
            for (let i = 1; i < nodesData.length; i++) {
              ctx.lineTo(
                nodesData[i].coordinates.x,
                nodesData[i].coordinates.y,
              );
            }
            ctx.stroke();

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI); // draw circle
            ctx.fill();

            const dx = nodesData[currentTargetIndex].coordinates.x - currentX; // target coordinate
            const dy = nodesData[currentTargetIndex].coordinates.y - currentY; // target coordinate
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
              currentTargetIndex = (currentTargetIndex + 1) % nodesData.length;
            } else {
              currentX += (dx / distance) * speed; // using vectors to calculate the ratio change and add to current
              currentY += (dy / distance) * speed;
            }
            if (currentTargetIndex === 0) {
              currentX = nodesData[0].coordinates.x;
              currentY = nodesData[0].coordinates.y;

              currentTargetIndex = 1;
            }

            requestAnimationFrame(moveDot);
          };
          moveDot();
        }
      };
    }
  }, [startNode, endNode, nodes, nodesData, distancesData]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          position: "absolute",
        }}
      >
        <TextField
          className={"nodeInputs"}
          id="startNode"
          label="Start Node"
          type="search"
          variant="filled"
          value={startNode}
          onChange={handleStartNodeChange}
        />
        <TextField
          className={"nodeInputs"}
          id="endNode"
          label="End Node"
          type="search"
          variant="filled"
          value={endNode}
          onChange={handleEndNodeChange}
        />
        <p
          style={{
            color: "red",
            margin: 0,
            padding: "5%",
            fontSize: "60%",
            height: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {errorMessage}
        </p>
        <Button className={"nodeInputs"} onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
          position: "relative",
        }}
        className={"firstFloorCanvas"}
      />
    </div>
  );
}

export default MapTestingPage;
