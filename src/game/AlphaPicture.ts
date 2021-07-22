import Picture from "./Picture";
import Resources from "./Resources";

export default class AlphaPicture extends Picture {
  constructor(
    resources: Resources,
    colorImage: HTMLImageElement,
    alphaImage: HTMLImageElement | undefined,
    x = 0,
    y = 0
  ) {
    super(resources, colorImage, x, y);

    const { width, height } = colorImage;

    const alphaContext = resources.getCanvas(width, height);
    alphaContext.drawImage(alphaImage, 0, 0);
    const alphaImageData = alphaContext.getImageData(0, 0, width, height);

    // draws base image onto canvas
    this.context2d = resources.getCanvas(width, height);
    this.context2d.drawImage(colorImage, 0, 0);
    const colorImageData = this.context2d.getImageData(0, 0, width, height);

    for (let i = 0, n = colorImageData.data.length; i < n; i += 4) {
      colorImageData.data[i + 3] =
        (alphaImageData.data[i] +
          alphaImageData.data[i + 1] +
          alphaImageData.data[i + 2]) /
        3;
    }

    resources.freeCanvas(alphaContext);
    this.context2d.putImageData(colorImageData, 0, 0);
    this.image = this.context2d.canvas;
  }
}
