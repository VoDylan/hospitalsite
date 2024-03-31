import React from "react";
import MapImage from "../images/00_thelowerlevel1.png";
import Dot from "./dot.tsx";
import "./map.css";

const Map: React.FC = () => {
  return (
    <div className={"firstFloor"}>
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
