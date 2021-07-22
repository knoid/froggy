import { WIN_HEIGHT, WIN_WIDTH } from "./constants";
import type { FontDefinition, FontLayer } from "./Font";
import Picture from "./Picture";
import Resources from "./Resources";

export default class TextPicture extends Picture {
  protected fontDefinition: FontDefinition;
  protected fontImage: Picture;
  protected layer: string;
  protected text: string;

  constructor(
    fontDefinition: FontDefinition,
    resources: Resources,
    fontImage: Picture,
    x: "center" | number,
    y: "center" | number,
    layer: string,
    text: string
  ) {
    const ctx = resources.getCanvas();
    super(resources, ctx.canvas);
    this.fontDefinition = fontDefinition;
    this.fontImage = fontImage;
    this.layer = layer;
    this.text = text;

    const { height } = fontImage;
    const width = this.calculateWidth();

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    this.setPos([
      x === "center" ? (WIN_WIDTH - width) / 2 : x,
      y === "center" ? (WIN_HEIGHT - height) / 2 : y,
    ]);

    this.drawText(ctx);
  }

  private drawText(ctx: CanvasRenderingContext2D) {
    let x = 0;
    const letters = this.letters();
    for (let i = 0, n = letters.length; i < n; i++) {
      const letter = letters[i];
      const rect = this.layerDefinition.ImageMap[letter];
      if (rect) {
        this.fontImage.draw(ctx, rect[0], rect[1], rect[2], rect[3], x, 0);
      }
      let keyringPair = 0;
      if (i < n - 1) {
        const lastCharPair = `${letter}${letters[i + 1]}`;
        keyringPair = this.layerDefinition.KerningPairs[lastCharPair] || 0;
      }
      x += this.layerDefinition.CharWidths[letter] + keyringPair;
    }
    this.context2d = ctx;
  }

  protected get layerDefinition(): FontLayer {
    return this.fontDefinition.layers[this.layer];
  }

  protected calculateWidth(): number {
    const letters = this.letters();
    const width = letters
      .map((letter) => this.layerDefinition.CharWidths[letter])
      .reduce((a, b) => a + b);
    const lastLetter = letters[letters.length - 1];
    return (
      width -
      this.layerDefinition.CharWidths[lastLetter] +
      this.layerDefinition.ImageMap[lastLetter][2]
    );
  }

  protected letters(): string[] {
    return this.text
      .split("")
      .map((char) => this.fontDefinition.CharMap[char] || char);
  }
}
