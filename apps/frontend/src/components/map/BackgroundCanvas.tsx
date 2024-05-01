import React, { useEffect, useRef } from "react";
import { jsx } from "@emotion/react";
import JSX = jsx.JSX;

import L1MapImage from "../../images/mapImages/00_thelowerlevel1_bg_SVG.svg";
import L2MapImage from "../../images/mapImages/00_thelowerlevel2_bg_SVG.svg";
import F1MapImage from "../../images/mapImages/01_thefirstfloor_bg_SVG.svg";
import F2MapImage from "../../images/mapImages/02_thesecondfloor_bg_SVG.svg";
import F3MapImage from "../../images/mapImages/03_thethirdfloor_bg_SVG.svg";

import { Floor } from "common/src/map/Floor.ts";

interface BackgroundCanvasProps {
  style: React.CSSProperties;
  floor: Floor;
  renderStatusCallback: (
    status: boolean,
    width: number,
    height: number,
  ) => void;
}

export default function BackgroundCanvas(
  props: BackgroundCanvasProps,
): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const floorToImage = (floor: Floor): string => {
    switch (floor) {
      case Floor.L1:
        return L1MapImage;
      case Floor.L2:
        return L2MapImage;
      case Floor.F1:
        return F1MapImage;
      case Floor.F2:
        return F2MapImage;
      case Floor.F3:
        return F3MapImage;
    }
  };

  useEffect(() => {
    const currImage: HTMLImageElement = new Image();
    currImage.src = floorToImage(props.floor);

    currImage.onload = () => {
      if (canvasRef.current) {
        const ctx: CanvasRenderingContext2D | null =
          canvasRef.current.getContext("2d");

        if (!ctx) return;

        canvasRef.current.width = currImage.width;
        canvasRef.current.height = currImage.height;

        ctx.clearRect(0, 0, currImage.width, currImage.height);

        ctx.drawImage(currImage, 0, 0, currImage.width, currImage.height);

        props.renderStatusCallback(true, currImage.width, currImage.height);
      }
    };
  }, [props, props.floor]);

  return <canvas ref={canvasRef} style={props.style} />;
}
