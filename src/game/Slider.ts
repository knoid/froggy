import AlphaPicture from "./AlphaPicture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Slider extends Scene {
  constructor(resources: Resources, x: number, y: number, label: string) {
    super(resources, x, y);
    const text = resources.fonts["Cancun10"].createText("Main", -55, 8, label);
    text.fill([210, 227, 32]);
    text.x -= text.width;

    this.addActors([
      new AlphaPicture(
        resources,
        resources.images["slidertrack"],
        resources.images["_slidertrack"],
        -45,
        0
      ),
      text,
    ]);
  }
}
