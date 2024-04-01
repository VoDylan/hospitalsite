import React, { useEffect, useRef, useState } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import { TextField, Button } from "@mui/material";
import "./map.css";
import { BFSalgorithm } from "./BFSalgorithm.ts";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startNode, setStartNode] = useState<string>("");
  const [endNode, setEndNode] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([]); // Declaring nodes state

  const handleStartNodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartNode(event.target.value);
  };

  const handleEndNodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndNode(event.target.value);
  };

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

        const bfsAlgorithm = new BFSalgorithm(nodes[0], nodes[1]);
        let nodesData = bfsAlgorithm.setup();

        if (!nodesData) nodesData = [];

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // draw the image

        ctx.fillStyle = "red";
        for (let i = 0; i < nodesData.length; i++) {
          ctx.beginPath(); // initialize a creation of a new path
          ctx.arc(nodesData[i].x, nodesData[i].y, 7, 0, 2 * Math.PI); // draw circle
          ctx.fill();
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(nodesData[0].x, nodesData[0].y); // Move to the first node
        for (let i = 1; i < nodesData.length; i++) {
          ctx.lineTo(nodesData[i].x, nodesData[i].y); // Draw a line to each subsequent node, acts as a move to as well
        }
        ctx.stroke();
      };
    }
  }, [nodes]); // Include nodes in the dependency array

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
          label="Starting Node"
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
        <Button
          className={"nodeInputs"}
          onClick={() => {
            setNodes([startNode, endNode]);
            console.log([startNode, endNode]);
          }}
        >
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
