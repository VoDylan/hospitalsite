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
        const speed = 2; // Adjust the speed of the animation

        const moveDot = () => {
          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the image on the canvas
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Draw the dot at the current position
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
          ctx.fill();

          // Calculate distance to the target
          const dx = nodes[currentTargetIndex].x - currentX;
          const dy = nodes[currentTargetIndex].y - currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If the dot is close to the target, move to the next target
          if (distance < speed) {
            currentTargetIndex = (currentTargetIndex + 1) % nodes.length;
          } else {
            // Move the dot towards the target
            currentX += (dx / distance) * speed;
            currentY += (dy / distance) * speed;
          }

          // Request the next frame
          requestAnimationFrame(moveDot);
        };

        // Start the animation
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
