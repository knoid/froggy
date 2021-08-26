/**
 * This file is using [Constrained Mixins][1] to build two different type of
 * Animation classes.
 * [1]: https://www.typescriptlang.org/docs/handbook/mixins.html
 */

import AlphaPicture from "./AlphaPicture";
import Picture from "./Picture";
import Resources from "./Resources";

export enum Orientation {
  horizontal,
  vertical,
}

type GConstructor<T> = new (...args: unknown[]) => T;
type BasePicture = GConstructor<Picture>;

function Animatable(BasePicture: BasePicture) {
  return class extends BasePicture {
    currentFrame = 0;

    constructor(
      resources: Resources,
      colorImage: string,
      x: number,
      y: number,
      public readonly framesCount: number,
      protected orientation: Orientation
    ) {
      super(resources, colorImage, x, y);
    }

    get height(): number {
      return this.orientation === Orientation.vertical
        ? super.height / this.framesCount
        : super.height;
    }

    get width(): number {
      return this.orientation === Orientation.horizontal
        ? super.width / this.framesCount
        : super.width;
    }

    draw(
      ctx: CanvasRenderingContext2D,
      sx = 0,
      sy = 0,
      width = this.width,
      height = this.height,
      x = this.x,
      y = this.y
    ): void {
      let frameX = 0;
      let frameY = 0;
      const factor = Math.floor(this.currentFrame) / this.framesCount;
      if (this.orientation === Orientation.vertical) {
        frameY = super.height * factor;
      } else {
        frameX = super.width * factor;
      }
      super.draw(ctx, frameX + sx, frameY + sy, width, height, x, y);
    }

    nextFrame(): void {
      this.currentFrame = ++this.currentFrame % this.framesCount;
    }
  };
}

export class AlphaAnimation extends Animatable(AlphaPicture) {}
export class Animation extends Animatable(Picture) {}
