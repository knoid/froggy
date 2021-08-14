import AlphaPicture from "./AlphaPicture";
import { Animation, Orientation } from "./Animation";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Frog extends Scene {
  private ballInside: Animation;

  constructor(resources: Resources, x: number, y: number) {
    const image = resources.image("smallFrogOnPad");
    super(x - image.width / 2, y - image.height / 2);
    this.pivot = [image.width / 2, image.height / 2];

    const ballInside = new Animation(
      resources,
      "baDotz",
      47,
      21,
      6,
      Orientation.horizontal
    );
    ballInside.pivot = [7, 33];
    ballInside.show = false;
    this.ballInside = ballInside;

    this.addActors([new AlphaPicture(resources, "smallFrogOnPad"), ballInside]);
  }
}
