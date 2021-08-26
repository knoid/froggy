import { Orientation } from "../Animation";
import Curve from "../Curve";
import { AnimationOnCurve } from "../OnCurve";
import Picture from "../Picture";
import Resources from "../Resources";

const colors = ["Blue", "Yellow", "Red", "Green", "Purple", "White"];

export default class Ball extends AnimationOnCurve {
  private alphaPicture: Picture;
  private canvas: CanvasRenderingContext2D;

  constructor(resources: Resources, color: number, curve: Curve) {
    const colorImage = `baBall${colors[color]}`;
    const { width, height } = resources.image(colorImage);
    const framesCount = height / width;
    super(resources, colorImage, curve, framesCount, Orientation.vertical);

    const alphaPicture = new Picture(resources, "_ballAlpha");
    alphaPicture.fill([0, 0, 0]);

    this.alphaPicture = alphaPicture;
    this.canvas = resources.getCanvas(alphaPicture.width, alphaPicture.height);
  }

  get position(): number {
    return super.position;
  }

  set position(value: number) {
    super.position = value;
    this.rotation = this.curve.angles[Math.floor(value)];
    this.currentFrame = Math.floor(value % this.framesCount);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.canvas.globalCompositeOperation = "copy";
    super.draw(this.canvas, 0, 0, this.width, this.height, 16, 16);
    this.canvas.globalCompositeOperation = "destination-in";
    this.alphaPicture.draw(this.canvas);
    this.canvas.globalCompositeOperation = "source-over";
    ctx.drawImage(this.canvas.canvas, this.x - 16, this.y - 16);
  }

  remove(): void {
    super.remove();
    this._resources.freeCanvas(this.canvas);
  }
}
