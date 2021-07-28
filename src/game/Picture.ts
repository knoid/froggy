import { logger } from "./constants";
import Drawable from "./Drawable";
import Emitter from "./Emitter";
import Resources from "./Resources";

type Coords2D = [number, number];
type EventsMap = {
  click: MouseEvent;
};
type ImageSource = HTMLImageElement | HTMLCanvasElement;
type RGB = [number, number, number];

export enum PointerEvents {
  All,
  None,
}

const log = logger.extend("picture");

export default class Picture extends Emitter<EventsMap> implements Drawable {
  center: Coords2D;
  rotation = 0;
  show = true;
  pointerEvents = PointerEvents.All;
  protected context2d: CanvasRenderingContext2D | null = null;

  constructor(
    protected resources: Resources,
    protected image: ImageSource,
    public x = 0,
    public y = 0
  ) {
    super();
    this.center = [this.width / 2, this.height / 2];
  }

  get width(): number {
    return this.image.width;
  }

  get height(): number {
    return this.image.height;
  }

  isPointInside(x: number, y: number): boolean {
    return (
      this.pointerEvents === PointerEvents.All &&
      this.show &&
      this.x < x &&
      x < this.x + this.width &&
      this.y < y &&
      y < this.y + this.height
    );
  }

  setPos(pos: Coords2D): this {
    this.x = pos[0];
    this.y = pos[1];
    return this;
  }

  setRotation(rotation: number): this {
    this.rotation = rotation;
    return this;
  }

  addRotation(diff: number): this {
    this.rotation = (this.rotation + diff) % (2 * Math.PI);
    return this;
  }

  fill(color: RGB): this {
    log("fill %o", color);
    const { width, height } = this.image;
    const ctx = this.resources.getCanvas(width, height);
    ctx.drawImage(this.image, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);

    for (let i = 0, n = imageData.data.length; i < n; i += 4) {
      imageData.data[i + 3] =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = color[0];
      imageData.data[i + 1] = color[1];
      imageData.data[i + 2] = color[2];
    }

    ctx.putImageData(imageData, 0, 0);
    this.image = ctx.canvas;
    if (this.context2d) {
      this.resources.freeCanvas(this.context2d);
    }
    this.context2d = ctx;
    return this;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    sx?: number,
    sy?: number,
    width?: number,
    height?: number,
    x: number = this.x,
    y: number = this.y
  ): void {
    if (this.show) {
      if (this.rotation) {
        ctx.save();
        const dim = [x + this.center[0], y + this.center[1]];
        ctx.translate(dim[0], dim[1]);
        ctx.rotate(this.rotation);
        ctx.translate(-dim[0], -dim[1]);
      }

      if (typeof sx === "number") {
        ctx.drawImage(this.image, sx, sy, width, height, x, y, width, height);
      } else {
        ctx.drawImage(this.image, x, y);
      }

      if (this.rotation) {
        ctx.restore();
      }
    }
  }

  remove(): void {
    if (this.context2d) {
      this.resources.freeCanvas(this.context2d);
    }
  }
}
