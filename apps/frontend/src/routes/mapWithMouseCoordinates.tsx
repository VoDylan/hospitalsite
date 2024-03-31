import React from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import Dot from "./dot.tsx";

const MapWithMouseCoordinates: React.FC = () => {
  // const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
  //     const imageElement = event.currentTarget;
  //     const rect = imageElement.getBoundingClientRect();
  //     const mouseX = event.clientX - rect.left;
  //     const mouseY = event.clientY - rect.top;
  //
  //     // Display pixel coordinates in the console
  //     console.log("Pixel Coordinates (X,Y):", mouseX, mouseY);
  //
  //     // You can also display the coordinates in the UI
  //     // Update state or display a tooltip, etc.
  // };

  return (
    <div className={"firstFloor"}>
      <img
        src={MapImage}
        alt={"Image of 1 Floor Map"}
        className={"firstFloorImage"}
        // onMouseMove={handleMouseMove}
      />
      <Dot x={1965} y={1284} />
    </div>
  );
};

export default MapWithMouseCoordinates;
