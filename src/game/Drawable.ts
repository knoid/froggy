import Emitter from "./Emitter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface Drawable extends Emitter<any> {
  draw(ctx: CanvasRenderingContext2D): void;
  isPointInside(x: number, y: number): boolean;
  remove(): void;
}
