// draw.ts
export class Draw {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    fillColor: string,
    strokeColor: string,
    lineWidth: number,
  ) {
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.closePath();

    this.ctx.stroke();
    this.ctx.fill();
  }

  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    strokeColor: string,
    lineWidth: number,
  ) {
    const topLeftX = x - (width / 2);
    const topLeftY = y - (height / 2);
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;

    this.ctx.beginPath();
    this.ctx.rect(topLeftX, topLeftY, width, height);
    this.ctx.closePath();

    this.ctx.stroke();
    this.ctx.fill();
  }

  drawPentagon(
    centerX: number,
    centerY: number,
    sideLength: number,
    fillColor: string,
    strokeColor: string,
    lineWidth: number,
  ) {
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;

    this.ctx.beginPath();
    const angleOffset = Math.PI / 2;

    for (let j = 0; j < 5; j++) {
      const angle = (j * 2 * Math.PI) / 5 - angleOffset;
      const x = centerX + sideLength * Math.cos(angle);
      const y = centerY + sideLength * Math.sin(angle);
      if (j === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.closePath();

    this.ctx.stroke();
    this.ctx.fill();
  }

  drawFloorIcon(
    x: number,
    y: number,
    scale: number,
    img: HTMLImageElement
  ) {
    if(scale <= 0) scale = 1;

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const topLeftCornerX = x - (scaledWidth / 2);
    const topLeftCornerY = y - (scaledHeight / 2);

    this.ctx.drawImage(img, topLeftCornerX, topLeftCornerY, scaledWidth, scaledHeight);
  }
}
