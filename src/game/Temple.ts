import AlphaPicture from "./AlphaPicture";
import Stage from "./Stage";
import Drawable from "./Drawable";
import { PointerEvents } from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Temple extends Scene {
  public title: Drawable;
  public selectedStage: Stage | null = null;

  constructor(
    resources: Resources,
    image: string,
    x: number,
    y: number,
    name: string,
    public stages: Stage[]
  ) {
    super();
    this.title = resources.fonts["NativeAlienExtended16"].createText(
      "Main",
      "center",
      385,
      name
    );
    const temple = new AlphaPicture(resources, image, x, y);
    temple.pointerEvents = PointerEvents.None;

    this.addActors([temple, ...stages]);
  }

  remove(): void {
    this.title.remove();
    super.remove();
  }
}
