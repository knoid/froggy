import Animation, { Orientation } from "./Animation";
import Resources from "./Resources";

enum MouseState {
  Out,
  Over,
  Down,
  Focus,
}

export default class Button extends Animation {
  constructor(
    resources: Resources,
    colorImage: HTMLImageElement,
    alphaImage: HTMLImageElement,
    x: number,
    y: number
  ) {
    super(resources, colorImage, alphaImage, x, y, 3, Orientation.horizontal);
    this.addEventListener("mousemove", this.onMouseMove);
    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown = ({ clientX, clientY }: MouseEvent): void => {
    this.currentFrame = this.isPointInside(clientX, clientY)
      ? MouseState.Down
      : MouseState.Out;
  };

  onMouseMove = ({ clientX, clientY }: MouseEvent): void => {
    this.currentFrame = this.isPointInside(clientX, clientY)
      ? Math.max(this.currentFrame, MouseState.Over)
      : MouseState.Out;
  };

  onMouseUp = ({ clientX, clientY }: MouseEvent): void => {
    this.currentFrame = this.isPointInside(clientX, clientY)
      ? MouseState.Over
      : MouseState.Out;
  };

  remove(): void {
    super.remove();
    this.removeEventListener("mousemove", this.onMouseMove);
    this.removeEventListener("mousedown", this.onMouseDown);
    this.removeEventListener("mouseup", this.onMouseUp);
  }
}
