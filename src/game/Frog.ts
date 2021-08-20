import AlphaPicture from "./AlphaPicture";
import { Animation, Orientation } from "./Animation";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

class HatchBack extends Picture {
  public ballInside: Animation;
  private alphaContext: CanvasRenderingContext2D;

  constructor(resources: Resources) {
    super(resources, "_hatchBack", 31, 12);
    this.fill([0, 0, 0]);
    this.alphaContext = this.context2d;

    this.context2d = resources.getCanvas(this.image.width, this.image.height);
    this.image = this.context2d.canvas;

    const ballInside = new Animation(
      resources,
      "baDotz",
      47 - 31,
      21 - 12,
      6,
      Orientation.horizontal
    );
    ballInside.pivot = [7, 33];
    this.ballInside = ballInside;

    this.drawBallInside();
  }

  private drawBallInside() {
    this.context2d.globalCompositeOperation = "copy"; // replaces everything
    this.ballInside.draw(this.context2d);
    this.context2d.globalCompositeOperation = "destination-out";
    this.context2d.drawImage(this.alphaContext.canvas, 0, 0);
    super.draw(this.context2d);
    this.context2d.globalCompositeOperation = "source-over";
  }

  remove() {
    super.remove();
    this.resources.freeCanvas(this.alphaContext);
  }
}
export default class Frog extends Scene {
  private hatchBack: HatchBack;

  constructor(resources: Resources, x: number, y: number) {
    const image = resources.image("smallFrogOnPad");
    super(x - image.width / 2, y - image.height / 2);
    this.pivot = [image.width / 2, image.height / 2];

    this.hatchBack = new HatchBack(resources);

    this.addActors([
      new AlphaPicture(resources, "smallFrogOnPad"),
      this.hatchBack,
    ]);
  }

  remove(): void {
    super.remove();
    this.hatchBack.remove();
  }
}
