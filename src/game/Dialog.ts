import AlphaPicture from "./AlphaPicture";
import { WIN_HEIGHT, WIN_WIDTH } from "./constants";
import Drawable from "./Drawable";
import Resources from "./Resources";
import Scene from "./Scene";

export default abstract class Dialog extends Scene implements Drawable {
  private background: AlphaPicture;
  public show = false;
  private toDraw: Array<
    [sx: number, sy: number, w: number, h: number, dx: number, dy: number]
  >;

  constructor(
    resources: Resources,
    private width: number,
    private height: number,
    title: string
  ) {
    super(resources, 0, 0);
    this.setSize();

    const titleFont = resources.fonts["NativeAlienExtended18"].createText(
      "Main",
      0,
      25,
      title
    );
    titleFont.x = (width - titleFont.width) / 2;

    this.background = new AlphaPicture(
      resources,
      this.resources.images["dialogbox"],
      this.resources.images["_dialogbox"]
    );

    this.addActors([titleFont]);
  }

  /**
   * Minimum size is 250x250.
   */
  private setSize() {
    const width = this.width + 11;
    const height = this.height;
    this.x = (WIN_WIDTH - this.width) / 2;
    this.y = (WIN_HEIGHT - this.height) / 2;

    const d0 = 85;
    const d1 = 165;
    const d2 = 78;
    const d3 = 157;

    const middleSquareWidth = d1 - d0;
    const middleSquareHeight = d3 - d2;

    const toDraw: Array<[number, number, number, number, number, number]> = [];
    for (let x = d0; x < width - d2; x += middleSquareWidth) {
      for (let y = d2; y < height - d2; y += middleSquareHeight) {
        toDraw.push([d0, d2, middleSquareWidth, middleSquareHeight, x, y]); // o
      }
    }

    for (let i = d0; i < width - d2; i += middleSquareWidth) {
      toDraw.push(
        [d0, 0, middleSquareWidth, d2, i, 0], // ^
        [d0, d3, middleSquareWidth, d0, i, height - d2] // _
      );
    }

    for (let i = d2; i < height - d2; i += middleSquareHeight) {
      toDraw.push(
        [0, d2, d0, middleSquareHeight, 0, i], // <
        [d1, d2, d2, middleSquareHeight, width - d2, i] // >
      );
    }

    toDraw.push(
      [0, 0, d0, d2, 0, 0], // ^<
      [d1, 0, d2, d2, width - d2, 0], // ^>
      [0, d3, d0, d0, 0, height - d2], // _<
      [d1, d3, d2, d0, width - d2, height - d2] // _>
    );

    this.toDraw = toDraw;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.show) {
      return;
    }

    ctx.save();
    ctx.translate(this.x - 11, this.y);

    this.toDraw.forEach((draw) => {
      this.background.draw(ctx, ...draw);
    });

    ctx.translate(11 - this.x, -this.y);
    super.draw(ctx);

    ctx.restore();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawActors(ctx: CanvasRenderingContext2D): void {
    // this should be overloaded by descendants of Dialog
  }

  isPointInside(x: number, y: number): boolean {
    return this.show && 0 <= x && x <= WIN_WIDTH && 0 <= y && y <= WIN_HEIGHT;
  }

  remove(): void {
    super.remove();
    this.background.remove();
  }

  protected findActor(x: number, y: number): Drawable | undefined {
    return super.findActor(x - this.x, y - this.y);
  }
}
