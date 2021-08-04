import Picture from "./Picture";
import Resources from "./Resources";

export default class AlphaPicture extends Picture {
  constructor(
    resources: Resources,
    colorImage: string | HTMLImageElement,
    alphaImage: string | HTMLImageElement,
    x = 0,
    y = 0
  ) {
    super(resources, colorImage, x, y);

    const { width, height } = this.image;
    const alphaImageImage =
      typeof alphaImage === "string" ? resources.image(alphaImage) : alphaImage;

    const alphaContext = resources.getCanvas(width, height);
    alphaContext.drawImage(alphaImageImage, 0, 0);
    const alphaImageData = alphaContext.getImageData(0, 0, width, height);
    for (let i = 0, n = alphaImageData.data.length; i < n; i += 4) {
      alphaImageData.data[i + 3] = alphaImageData.data[i];
    }
    alphaContext.putImageData(alphaImageData, 0, 0);

    // draws base image onto canvas
    this.context2d = resources.getCanvas(width, height);
    this.context2d.drawImage(this.image, 0, 0);
    this.context2d.globalCompositeOperation = "destination-in";
    this.context2d.drawImage(alphaContext.canvas, 0, 0);

    resources.freeCanvas(alphaContext);
    this.image = this.context2d.canvas;
  }
}
