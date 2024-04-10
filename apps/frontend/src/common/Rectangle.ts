// rectangle.ts
export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor: string,
  strokeColor: string,
  lineWidth: number,
) {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();
}
