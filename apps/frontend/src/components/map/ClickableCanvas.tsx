import React, { useEffect, useRef } from "react";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";

interface ClickableCanvasProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  onClick: (event: React.MouseEvent) => void;
  onDoubleClick: (event: React.MouseEvent) => void;
}

export default function ClickableCanvas(props: ClickableCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (props.backgroundRendered)
      initializeLayeredCanvas(canvasRef.current, props.width, props.height);
  }, [props.backgroundRendered, props.height, props.width]);

  return <canvas ref={canvasRef} style={props.style} onClick={props.onClick} onDoubleClick={props.onDoubleClick}/>;
}
