// pentagon.ts
export function drawPentagon(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, sideLength: number, fillColor: string, strokeColor: string, lineWidth: number) {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  const angleOffset = Math.PI / 2;

  // Calculate the coordinates for the five points of the pentagon
  for (let j = 0; j < 5; j++) {
    const angle = (j * 2 * Math.PI / 5) - angleOffset;
    const x = centerX + sideLength * Math.cos(angle);
    const y = centerY + sideLength * Math.sin(angle);
    if (j === 0) {
      ctx.moveTo(x, y); // Move to the first point
    } else {
      ctx.lineTo(x, y); // Draw line to subsequent points
    }
  }

  ctx.closePath(); // Close the path to complete the pentagon

  // Stroke and fill the pentagon
  ctx.stroke();
  ctx.fill();
}
