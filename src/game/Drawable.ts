import Emitter from "./Emitter";

export default interface Drawable extends Emitter {
  draw(ctx: CanvasRenderingContext2D): void;
  isPointInside(x: number, y: number): boolean;
  remove(): void;
}
