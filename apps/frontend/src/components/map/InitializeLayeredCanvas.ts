export default function initializeLayeredCanvas(
  canvasRef: HTMLCanvasElement | null,
  width: number,
  height: number,
) {
  if (canvasRef) {
    const canvas: HTMLCanvasElement = canvasRef;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
  }
}
