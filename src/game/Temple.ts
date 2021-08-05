import AlphaPicture from "./AlphaPicture";
import Door from "./Door";
import Drawable from "./Drawable";
import { PointerEvents } from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Temple extends Scene {
  public title: Drawable;
  public selectedDoor: Door | null = null;

  constructor(
    resources: Resources,
    image: string,
    x: number,
    y: number,
    name: string,
    public doors: Door[]
  ) {
    super(resources);
    this.title = resources.fonts["NativeAlienExtended16"].createText(
      "Main",
      "center",
      385,
      name
    );
    const temple = new AlphaPicture(resources, image, x, y);
    temple.pointerEvents = PointerEvents.None;

    doors.forEach((door) => door.addEventListener("click", this.onDoorClick));

    this.addActors([temple, ...doors]);
  }

  remove(): void {
    this.title.remove();
    super.remove();
    this.doors.forEach((door) =>
      door.removeEventListener("click", this.onDoorClick)
    );
  }

  private onDoorClick = (e: MouseEvent) => {
    this.dispatchEvent(
      new CustomEvent("doorClick", { detail: e.relatedTarget })
    );
  };
}
