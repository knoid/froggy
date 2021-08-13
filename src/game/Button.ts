import { AlphaAnimation, Orientation } from "./Animation";
import Resources from "./Resources";

export enum MouseState {
  Out,
  Over,
  Down,
  Focus,
}

export default class Button extends AlphaAnimation {
  constructor(resources: Resources, colorImage: string, x: number, y: number) {
    super(resources, colorImage, x, y, 3, Orientation.horizontal);
    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("mouseout", this.onMouseOut);
    this.addEventListener("mouseover", this.onMouseOver);
    this.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown = (): void => {
    this._currentFrame = MouseState.Down;
  };

  onMouseOut = (): void => {
    this._currentFrame = MouseState.Out;
  };

  onMouseOver = (): void => {
    this._currentFrame = MouseState.Over;
  };

  onMouseUp = ({ clientX, clientY }: MouseEvent): void => {
    this._currentFrame = this.isPointInside(clientX, clientY)
      ? MouseState.Over
      : MouseState.Out;
  };

  remove(): void {
    super.remove();
    this.removeEventListener("mousedown", this.onMouseDown);
    this.removeEventListener("mouseup", this.onMouseUp);
  }
}
