import JSZip from "jszip";
import { logger } from "./constants";
import Emitter from "./Emitter";
import Font from "./Font";

const log = logger.extend("resources");

type LoaderEventMap = {
  progress: ProgressEvent;
  error: Event;
};

const imagesPathRegex = /^(fonts|images|levels)\/(.+)\.(gif|jpg)$/i;
const fontsPathRegex = /^(fonts)\/(.+)\.txt$/i;

export default class Resources {
  private freeCanvases: HTMLCanvasElement[] = [];
  public images: { [filePath: string]: HTMLImageElement } = {};
  public fonts: { [fontName: string]: Font } = {};

  constructor(private fs: JSZip) {}

  async loadFont(fontName: string): Promise<Font> {
    log("font load start %s", fontName);
    const fontDefinitionFileBuffer = await this.fs
      .file(`fonts/${fontName}.txt`)
      .async("blob");
    const fontDefinitionFile = await new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (ev) => {
        const { result } = ev.target;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject();
        }
      });
      fileReader.addEventListener("error", reject);
      fileReader.readAsText(fontDefinitionFileBuffer, "windows1252");
    });

    const font = new Font(this, fontDefinitionFile);
    this.fonts[fontName] = font;
    log("saved font as %s", fontName);
    return font;
  }

  freeCanvas(context2d: CanvasRenderingContext2D): void {
    context2d.canvas.width = 1;
    context2d.canvas.height = 1;
    context2d.globalCompositeOperation = "source-over";
    this.freeCanvases.push(context2d.canvas);
  }

  getCanvas(width?: number, height?: number): CanvasRenderingContext2D {
    let canvas: HTMLCanvasElement;
    if (this.freeCanvases.length > 0) {
      canvas = this.freeCanvases.pop();
    } else {
      canvas = document.createElement("canvas");
      log("new canvas");
    }

    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    return ctx;
  }

  async loadImage(filePath: string): Promise<HTMLImageElement> {
    log("image load start %s", filePath);
    const blob = await this.fs.file(filePath).async("blob");
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (ev) => {
        const { result } = ev.target;
        if (typeof result !== "string") {
          throw new Error("FileReader did not return a valid string");
        }
        const image = new Image();
        image.addEventListener("load", () => {
          const basename = filePath.match(imagesPathRegex)[2];
          this.images[basename] = image;
          this.fs.remove(filePath);
          log("saved image as %s", basename);
          resolve(image);
        });
        image.addEventListener("error", reject);
        image.src = result;
      });
      fileReader.addEventListener("error", reject);
      fileReader.readAsDataURL(blob);
    });
  }

  loadAll(): Emitter<LoaderEventMap> {
    const emitter = new Emitter<LoaderEventMap>();
    const images = this.fs.file(imagesPathRegex);
    const fonts = this.fs.file(fontsPathRegex);
    const total = images.length + fonts.length;
    let loaded = 0;

    function dispatchProgress() {
      loaded++;
      log("progress %d out of %d", loaded, total);
      const event = new ProgressEvent("progress", { loaded, total });
      emitter.dispatchEvent(event);
    }

    this.serialLoader(images, async (image) => {
      await this.loadImage(image.name);
      dispatchProgress();
    }).then(() =>
      this.serialLoader(fonts, async (fontFile) => {
        const basename = fontFile.name.match(fontsPathRegex)[2];
        await this.loadFont(basename);
        dispatchProgress();
      })
    );

    return emitter;
  }

  private serialLoader<T, R>(array: T[], loader: (elem: T) => Promise<R>) {
    return array.reduce(
      (promises, element) =>
        // checks that all previous elements are done before loading current one
        Promise.resolve(promises).then(async (previousResults) => {
          const newResult = await loader(element);
          return [...previousResults, newResult];
        }),
      Promise.resolve([])
    );
  }
}
