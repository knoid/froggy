import between from "./between";
import Drawable from "./Drawable";

// disabling `any` warning, this follows the Mixins documentation.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GConstructor<T> = new (...args: any[]) => T;

interface RotatableInstance {
  pivot: [number, number];
  rotation: number;
}

export default function Rotatable<
  D extends Drawable,
  T extends GConstructor<D>
>(BaseClass: T): GConstructor<RotatableInstance> & T {
  // @ts-expect-error no idea how to make types work here
  return class Rotation extends BaseClass {
    pivot: [number, number] = [0, 0];
    private _rotation = 0;

    set rotation(radians: number) {
      this._rotation = between(0, Math.PI * 2, radians);
    }

    get rotation() {
      return this._rotation;
    }

    draw(ctx: CanvasRenderingContext2D, ...args: number[]) {
      if (this.rotation) {
        ctx.save();
        const dim = [this.x + this.pivot[0], this.y + this.pivot[1]];
        ctx.translate(dim[0], dim[1]);
        ctx.rotate(this.rotation);
        ctx.translate(-dim[0], -dim[1]);
      }

      super.draw(ctx, ...args);

      if (this.rotation) {
        ctx.restore();
      }
    }
  };
}
