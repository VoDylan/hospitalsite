import React, { useEffect, useRef, useState } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import { TextField, Button } from "@mui/material";
import "./map.css";
// import { BFSalgorithm } from "../../../backend/src/BFSalgorithm.ts";
import TopBanner from "../components/TopBanner";
import { Coordinates } from "common/src/Coordinates.ts";
import axios from "axios";
import { LocationInfo } from "common/src/LocationInfo.ts";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]); // Declaring nodes state
  const [errorMessage, setErrorMesage] = useState<string>("");
  const [nodesData, setNodesData] = useState<Coordinates[]>([]);
  const handleStartNodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartNode(event.target.value);
  };

  const handleEndNodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndNode(event.target.value);
  };

  const updateNodesData = (newData: Coordinates[]) => {
    setNodesData(newData);
  };

  async function handleSubmit() {
    if (startNode.trim() === "" || endNode.trim() === "") {
      // handles if one of them is empty
      setErrorMesage("Please enter both start and end nodes");
      return;
    }

    const request: LocationInfo = { startNode: startNode, endNode: endNode };

    const response = await axios.post("/api/path", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.data;
    const path = data.message;
    console.log(path);
    updateNodesData(path);
    // console.log(nodesArray);

    setNodes([startNode, endNode]);
    setErrorMesage("");
  }

  useEffect(() => {
    if (canvasRef.current) {
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

        if (startNode.trim() === nodes[0] && endNode.trim() === nodes[1]) {
          // this is so its clicked the same time

          // const bfsAlgorithm = new BFSalgorithm(nodes[0], nodes[1]);
          // const nodesData = bfsAlgorithm.setup();

          // nodesData: Coordinates[] = [];

          if (!nodesData) {
            setErrorMesage("There is no path between nodes");
            return;
          }

          // animation
          let currentTargetIndex = 0;
          let currentX = nodesData[currentTargetIndex].x;
          let currentY = nodesData[currentTargetIndex].y;
          const speed = 1;

          const moveDot = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";

            // display all the nodes on the map if required
            for (let i = 0; i < nodesData.length; i++) {
              ctx.beginPath();
              ctx.arc(nodesData[i].x, nodesData[i].y, 5, 0, 2 * Math.PI); // draw circle
              ctx.fill();
            }

            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(nodesData[0].x, nodesData[0].y);
            for (let i = 1; i < nodesData.length; i++) {
              ctx.lineTo(nodesData[i].x, nodesData[i].y);
            }
            ctx.stroke();

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(currentX, currentY, 10, 0, 2 * Math.PI); // draw circle
            ctx.fill();

            const dx = nodesData[currentTargetIndex].x - currentX; // target coordinate
            const dy = nodesData[currentTargetIndex].y - currentY; // target coordinate
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
              // if the distance is close then move to the next node
              currentTargetIndex = (currentTargetIndex + 1) % nodesData.length;
            } else {
              currentX += (dx / distance) * speed; // using vectors to calculate the ratio change and add to current
              currentY += (dy / distance) * speed;
            }
            if (currentTargetIndex === 0) {
              currentX = nodesData[0].x;
              currentY = nodesData[0].y;

              currentTargetIndex = 1;
            }

            requestAnimationFrame(moveDot); // loop to call move to function consistently
          };
          moveDot();
        }
      };
    }
  }, [startNode, endNode, nodes, nodesData]);

  return (
    <div style={{ marginTop: "120px" }}>
      <TopBanner />
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

export default Map;
