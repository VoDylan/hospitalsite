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

      if (!ctx) return;

      const image = new Image();
      image.src = MapImage;
      image.onload = () => {
        // Set the canvas size
        canvas.width = image.width;
        canvas.height = image.height;

        // Define nodes' coordinates
        const nodes = [
          { x: 2255, y: 849 },
          { x: 1500, y: 1000 },
          { x: 1000, y: 500 },
          // Add more nodes as needed
        ];

        let currentTargetIndex = 0;
        let currentX = nodes[currentTargetIndex].x;
        let currentY = nodes[currentTargetIndex].y;
        const speed = 0.5; // Adjust the speed of the animation

        const moveDot = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

          ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // draw the image

          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI); // draw circle
          ctx.fill();

          const dx = nodes[currentTargetIndex].x - currentX; // target coordinate
          const dy = nodes[currentTargetIndex].y - currentY; // target coordinate
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < speed) {
            // if the distance is close then move to the next node
            currentTargetIndex = (currentTargetIndex + 1) % nodes.length; // % is used to loop through
          } else {
            currentX += (dx / distance) * speed; // using vectors to calculate the ratio change and add to current
            currentY += (dy / distance) * speed;
          }

          // requestAnimationFrame(moveDot); // loop to call move to function consistently
        };

        moveDot();
      };
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
