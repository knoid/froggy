import AlphaPicture from "./AlphaPicture";
import Resources from "./Resources";

export enum Orientation {
  horizontal,
  vertical,
}

export default class Animation extends AlphaPicture {
  protected currentFrame = 0;

  constructor(
    resources: Resources,
    colorImage: string,
    x: number,
    y: number,
    protected framesCount: number,
    protected orientation: Orientation
  ) {
    super(resources, colorImage, x, y);
  }

  get height(): number {
    return this.orientation === Orientation.vertical
      ? super.height / this.framesCount
      : super.height;
  }

  get width(): number {
    return this.orientation === Orientation.horizontal
      ? super.width / this.framesCount
      : super.width;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    sx = 0,
    sy = 0,
    width = this.width,
    height = this.height,
    x = this.x,
    y = this.y
  ): void {
    let frameX = 0;
    let frameY = 0;
    const factor = Math.floor(this.currentFrame) / this.framesCount;
    if (this.orientation === Orientation.vertical) {
      frameY = super.height * factor;
    } else {
      frameX = super.width * factor;
    }
    super.draw(ctx, frameX + sx, frameY + sy, width, height, x, y);
  }

  nextFrame(): void {
    this.currentFrame = ++this.currentFrame % this.framesCount;
  }
}
