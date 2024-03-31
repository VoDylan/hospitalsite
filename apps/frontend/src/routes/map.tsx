import React from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import Dot from "./dot.tsx";
import "./map.css";

const Map: React.FC = () => {
  // Define the scale factor for the container
  const containerScaleFactor = 0.5; // Adjust this value to change the scale of the container

  return (
    <div
      className={"firstFloor"}
      style={{
        transform: `scale(${containerScaleFactor})`,
        transformOrigin: "top left", // Set the transform origin to the top-left corner
      }}
    >
      <img
        src={MapImage}
        alt={"Image of 1 Floor Map"}
        className={"firstFloorImage"}
      />
      <Dot x={2255} y={849} />
    </div>
  );
};

export default Map;
