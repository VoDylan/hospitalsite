import {ReactZoomPanPinchState} from "react-zoom-pan-pinch";

export default function transformCoords2(
  mouseX: number,
  mouseY: number,
  transformInfo: ReactZoomPanPinchState,
  realContentWidth: number,
  realContentHeight: number,
  windowWidth: number,
  windowHeight: number,
  rect: DOMRect
) {
  console.log(`mouseX: ${mouseX} | mouseY: ${mouseY} | realContentWidth: ${realContentWidth} | realContentHeight: ${realContentHeight} | windowWidth: ${windowWidth} | windowHeight: ${windowHeight} | rect.width: ${rect.width} | rect.height: ${rect.height}`);
  console.log(transformInfo);

  const actualX = Math.round(((mouseX - (windowWidth * 0.18)) - transformInfo.positionX) / transformInfo.scale);
  const actualY = Math.round(((mouseY - (120)) - transformInfo.positionY) / transformInfo.scale);

  return {actualX, actualY};
}
