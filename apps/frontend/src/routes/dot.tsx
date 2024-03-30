import React from "react";

const Dot: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const dotStyle: React.CSSProperties = {
    position: "absolute",
    top: y + "px",
    left: x + "px",
    width: "20px",
    height: "20px",
    borderRadius: "50%", // To make the dot circular
    backgroundColor: "red", // Set the color of the dot
  };

  return <div style={dotStyle}></div>;
};

export default Dot;
