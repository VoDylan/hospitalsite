import React, { useEffect, useRef } from "react";
import MapImage from "../images/00_thelowerlevel1.png";
// import Dot from "./dot.tsx";
import "./map.css";

const Map: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const image = new Image();
        image.src = MapImage;
        image.onload = () => {
          // Set the canvas size
          canvas.width = image.width;
          canvas.height = image.height;

          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the image on the canvas
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Draw the dot at the specified coordinates
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(2255, 849, 5, 0, 2 * Math.PI);
          ctx.fill();
        };
      }
    }
  }, []);

  return (
    <div className={"firstFloor"}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        className={"firstFloorCanvas"}
      />
    </div>
  );
};

export default Map;
