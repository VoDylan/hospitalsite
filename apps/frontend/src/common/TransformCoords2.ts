import {TransformState} from "./TransformState.ts";
import React from "react";

export default function transformCoords2(
  mouseX: number,
  mouseY: number,
  transformInfo: React.MutableRefObject<TransformState>,
  realContentWidth: number,
  realContentHeight: number,
  windowWidth: number,
  windowHeight: number,
  rect: DOMRect
) {
  console.log(`mouseX: ${mouseX} | mouseY: ${mouseY} | realContentWidth: ${realContentWidth} | realContentHeight: ${realContentHeight} | windowWidth: ${windowWidth} | windowHeight: ${windowHeight} | rect.width: ${rect.width} | rect.height: ${rect.height}`);
  console.log(transformInfo.current);
  // const leftOverHeight =
  //   (windowHeight - 120) / (rect.height / transformInfo.current.scale);
  //
  const widthRatio =
    realContentWidth / (windowWidth - (windowWidth * 0.18));
  const heightRatio = realContentHeight / (windowHeight - 120);

  // const actualX = Math.round(
  //   ((mouseX - (windowWidth * 0.18) - transformInfo.current.positionX) *
  //     transformInfo.current.scale) *
  //     widthRatio
  // );
  // const actualY = Math.round(
  //   ((mouseY - 120 - transformInfo.current.positionY) *
  //     transformInfo.current.scale) *
  //     heightRatio
  // );

  const actualX = Math.round((mouseX - (windowWidth * 0.18)) * widthRatio);
  const actualY = Math.round((mouseY - (120)) * heightRatio);

  return {actualX, actualY};
}
