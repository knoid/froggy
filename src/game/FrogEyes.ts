import AlphaPicture from "./AlphaPicture";
import Drawable from "./Drawable";
import Emitter from "./Emitter";
import Picture from "./Picture";
import Resources from "./Resources";

export default class FrogEyes extends Emitter implements Drawable {
  private leftEye: Picture;
  private rightEye: Picture;
  private context2d: CanvasRenderingContext2D;

  constructor(
    private resources: Resources,
    public x: number,
    public y: number
  ) {
    super();
    const { width, height } = this.resources.image("_mmEyeMask");
    const r = resources;
    this.leftEye = new AlphaPicture(r, "mmEyeLeft", 20, 27);
    this.rightEye = new AlphaPicture(r, "mmEyeRight", 78, 17);

    const context = r.getCanvas(width, height);
    this.leftEye.draw(context);
    this.rightEye.draw(context);
    context.globalCompositeOperation = "destination-out";
    context.drawImage(this.getMaskImage(), 0, 0);

    this.context2d = context;
  }

  private getMaskImage() {
    const eyesMask = this.resources.image("_mmEyeMask");
    const { width, height } = eyesMask;
    const context = this.resources.getCanvas(width, height);
    context.drawImage(eyesMask, 0, 0);
    const eyesMaskImageData = context.getImageData(0, 0, width, height);
    for (let i = 0, n = eyesMaskImageData.data.length; i < n; i += 4) {
      eyesMaskImageData.data[i + 3] = eyesMaskImageData.data[i];
    }
    context.putImageData(eyesMaskImageData, 0, 0);
    return context.canvas;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.context2d.canvas, this.x, this.y);
  }

  isPointInside(): boolean {
    return false;
  }

  remove(): void {
    this.resources.freeCanvas(this.context2d);
  }
}
