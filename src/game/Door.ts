import Animation, { Orientation } from "./Animation";
import { MouseState } from "./Button";
import { PointerEvents } from "./Picture";
import Resources from "./Resources";

export default class Door extends Animation {
  selected = false;

  constructor(
    resources: Resources,
    colorImage: string,
    x: number,
    y: number,
    stage: number,
    opened = false
  ) {
    super(resources, colorImage, x, y, 4, Orientation.horizontal);
    this.pointerEvents = opened ? PointerEvents.All : PointerEvents.None;

    if (opened) {
      this.currentFrame = 1;
      this.addEventListener("mouseover", this.onMouseOver);
      this.addEventListener("mouseout", this.onMouseOut);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const currentFrame = this.currentFrame;
    this.currentFrame = this.selected ? MouseState.Focus : currentFrame;
    super.draw(ctx);
    this.currentFrame = currentFrame;
  }

  remove(): void {
    super.remove();
    this.removeEventListener("mouseover", this.onMouseOver);
    this.removeEventListener("mouseout", this.onMouseOut);
  }

  private onMouseOver = () => {
    this.currentFrame = MouseState.Over + 1;
  };

  private onMouseOut = () => {
    this.currentFrame = MouseState.Out + 1;
  };
}
