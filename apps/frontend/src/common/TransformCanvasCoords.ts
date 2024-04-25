export default function transformCanvasCoords(
  mouseX: number,
  mouseY: number,
  transformScale: number,
  transformX: number,
  transformY: number,
  canvasWidth: number,
  canvasHeight: number,
  rect: DOMRect
) {
  const leftOverHeight =
    (window.innerHeight - 120) / (rect.height / transformScale);
  console.log(leftOverHeight);

  const widthRatio =
    canvasWidth / (window.innerWidth - window.innerWidth * 0.18);
  const heightRatio = canvasHeight / (window.innerHeight - 120);

  const actualX = Math.round(
    ((mouseX -
      transformX -
      window.innerWidth * 0.18) /
      transformScale) *
    widthRatio
  );
  const actualY = Math.round(
    ((mouseY - transformY - 120) /
      transformScale) *
    heightRatio *
    leftOverHeight
  );

  return {actualX, actualY};
}
