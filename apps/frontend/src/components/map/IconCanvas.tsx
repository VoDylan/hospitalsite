import React, { useEffect, useRef } from "react";
import initializeLayeredCanvas from "./InitializeLayeredCanvas.ts";

interface IconProps {
  style: React.CSSProperties;
  backgroundRendered: boolean;
  width: number;
  height: number;
  refCallback: (ref: HTMLCanvasElement) => void;
}

export default function IconCanvas(props: IconProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const refCallback = props.refCallback;

  useEffect(() => {
    if (props.backgroundRendered)
      initializeLayeredCanvas(canvasRef.current, props.width, props.height);
    if (canvasRef.current) {
      refCallback(canvasRef.current);
    }
  }, [props.backgroundRendered, props.height, props.width, refCallback]);

  return <canvas ref={canvasRef} style={props.style} />;
}
