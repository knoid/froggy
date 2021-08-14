import Emitter from "./Emitter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default interface Drawable extends Emitter<any> {
  x: number;
  y: number;
  draw(
    ctx: CanvasRenderingContext2D,
    sx?: number,
    sy?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number
  ): void;
  isPointInside(x: number, y: number): boolean;
  remove(): void;
}
