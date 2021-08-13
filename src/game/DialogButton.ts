import Button, { MouseState } from "./Button";
import Resources from "./Resources";
import TextPicture from "./TextPicture";

export default class DialogButton extends Button {
  private text: TextPicture;
  private expandedWidth: number;

  constructor(
    resources: Resources,
    x: number,
    y: number,
    width: number,
    label: string
  ) {
    super(resources, "dialogButton", x, y);

    const text = resources.fonts["Cancun10"].createText("Main", 0, 12, label);
    text.fill([210, 227, 32]);
    text.x = (width - text.width) / 2;
    this.text = text;
    this.expandedWidth = width;
  }

  get width(): number {
    return this.expandedWidth;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    super.draw(ctx, 0, 0, 40, 48, 0, 0);
    super.draw(ctx, 80, 0, 40, 48, this.width - 40, 0);
    for (let i = 40, n = this.width - 40; i < n; i += 40) {
      super.draw(ctx, 40, 0, 40, 48, i, 0);
    }

    if (this._currentFrame === MouseState.Down) {
      ctx.translate(-1, 1);
    }
    this.text.draw(ctx);
    ctx.restore();
  }

  remove(): void {
    super.remove();
    this.text.remove();
  }
}
