import { AlphaAnimation, Animation, Orientation } from "./Animation";
import Curve from "./Curve";
import Drawable from "./Drawable";
import Resources from "./Resources";
import { RotatableInstance } from "./Rotatable";

type GConstructor<T> = new (...args: unknown[]) => T;

function OverCurved<R extends RotatableInstance & Drawable>(
  BaseClass: GConstructor<R>
) {
  // @ts-expect-error no idea how to make types work here
  return class OverCurve extends BaseClass {
    private _position: number;

    constructor(
      resources: Resources,
      colorImage: string,
      private curve: Curve,
      framesCount: number,
      orientation: Orientation
    ) {
      super(resources, colorImage, 0, 0, framesCount, orientation);
      const { height, width } = resources.image(colorImage);
      const size = orientation === Orientation.horizontal ? height : width;
      this.pivot = [size / 2, size / 2];
      this.position = 0;
    }

    get position() {
      return this._position;
    }

    set position(value: number) {
      this._position = value;
      const { points } = this.curve;
      this.x = value < points.length ? points[value][0] : NaN;
      this.y = value < points.length ? points[value][1] : NaN;
    }

    draw(ctx: CanvasRenderingContext2D, sx?: number, sy?: number): void {
      ctx.translate(-this.pivot[0], -this.pivot[1]);
      super.draw(ctx, sx, sy);
      ctx.translate(this.pivot[0], this.pivot[1]);
    }
  };
}

export class AnimationOnCurve extends OverCurved(Animation) {}
export class AlphaAnimationOnCurve extends OverCurved(AlphaAnimation) {}
