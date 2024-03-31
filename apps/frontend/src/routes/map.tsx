import React, { useEffect, useRef } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import { TextField } from "@mui/material";
import "./map.css";
// import {number} from "prop-types";

function Map() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const image = new Image();
      image.src = MapImage;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        const nodes = [
          { x: 2255, y: 849 },
          { x: 2665, y: 1043 },
          { x: 2770, y: 1284 },
        ];

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // draw the image

        ctx.fillStyle = "red";
        for (let i = 0; i < nodes.length; i++) {
          ctx.beginPath(); // initialize a creation of a new path
          ctx.arc(nodes[i].x, nodes[i].y, 7, 0, 2 * Math.PI); // draw circle
          ctx.fill();
        }

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y); // Move to the first node
        for (let i = 1; i < nodes.length; i++) {
          ctx.lineTo(nodes[i].x, nodes[i].y); // Draw a line to each subsequent node, acts as a move to as well
        }
        ctx.stroke();
      };
    }
  }, []);

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
          id="filled-search"
          label="Starting Node"
          type="search"
          variant="filled"
        />
        <TextField
          className={"nodeInputs"}
          id="filled-search"
          label="End Node"
          type="search"
          variant="filled"
        />
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
