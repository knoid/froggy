import AlphaPicture from "./AlphaPicture";
import { MouseState } from "./Button";
import { PointerEvents } from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

const SliderMinX = -42;
const SliderMaxX = 112;

export default class Slider extends Scene {
  private thumb: AlphaPicture;
  private thumbState = MouseState.Out;
  private track: AlphaPicture;

  constructor(resources: Resources, x: number, y: number, label: string) {
    super(x, y);
    const text = resources.fonts["Cancun10"].createText("Main", -55, 8, label);
    text.fill([210, 227, 32]);
    text.x -= text.width;

    this.track = new AlphaPicture(resources, "sliderTrack", -45, 0);
    this.track.addEventListener("mousedown", this.onTrackDown);
    this.track.addEventListener("mousemove", this.onTrackMove);
    this.track.addEventListener("mouseup", this.onTrackUp);

    this.thumb = new AlphaPicture(resources, "sliderThumb", SliderMinX, 0);
    this.thumb.pointerEvents = PointerEvents.None;

    this.addActors([text, this.track, this.thumb]);
  }

  remove(): void {
    super.remove();
    this.track.removeEventListener("mousedown", this.onTrackDown);
    this.track.removeEventListener("mousemove", this.onTrackMove);
    this.track.removeEventListener("mouseup", this.onTrackUp);
  }

  private onTrackDown = (e: MouseEvent) => {
    this.thumbState = MouseState.Down;
    this.setValueFromEvent(e);
  };

  private onTrackMove = (e: MouseEvent) => {
    if (this.thumbState === MouseState.Down) {
      this.setValueFromEvent(e);
    }
  };

  private onTrackUp = () => {
    this.thumbState = MouseState.Out;
  };

  private setValueFromEvent({ clientX }: MouseEvent) {
    this.thumb.x = Math.min(Math.max(SliderMinX, clientX - 23), SliderMaxX);
  }
}
