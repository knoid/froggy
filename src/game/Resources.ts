import JSZip from "jszip";
import { logger } from "./constants";
import Emitter from "./Emitter";
import Font from "./Font";

const log = logger.extend("resources");

type ImageLoaderEventMap = {
  progress: ProgressEvent;
  error: Event;
};

export default class Resources {
  private fontDefinitions: { [fontName: string]: Font } = {};
  private freeCanvases: HTMLCanvasElement[] = [];
  public images: { [filePath: string]: HTMLImageElement } = {};

  constructor(private fs: JSZip) {}

  async getFont(fontName: string): Promise<Font> {
    if (this.fontDefinitions[fontName]) {
      return this.fontDefinitions[fontName];
    }

    const fontDefinitionFile = await this.fs
      .file(`fonts/${fontName}.txt`)
      .async("string");

    const font = new Font(this, fontDefinitionFile);
    this.fontDefinitions[fontName] = font;
    return font;
  }

  freeCanvas(context2d: CanvasRenderingContext2D): void {
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
    log("image load start", filePath);
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
          this.images[filePath] = image;
          this.fs.remove(filePath);
          log("image load finished", filePath);
          resolve(image);
        });
        image.addEventListener("error", reject);
        image.src = result;
      });
      fileReader.addEventListener("error", reject);
      fileReader.readAsDataURL(blob);
    });
  }

  loadAllImages(): Emitter<ImageLoaderEventMap> {
    const emitter = new Emitter<ImageLoaderEventMap>();
    const images = this.fs.file(/^(fonts|images|levels)\/.+\.(gif|jpg)$/);
    const total = images.length;
    let loaded = 0;

    // loads one image at a time
    images.reduce(
      (promises, image) =>
        // checks that all previous images were loaded before loading current one
        Promise.resolve(promises).then(async (previousResults) => {
          const imageElement = await this.loadImage(image.name);
          loaded++;
          log("progress %d out of %d", loaded, total);
          const event = new ProgressEvent("progress", { loaded, total });
          emitter.dispatchEvent(event);
          return [...previousResults, imageElement];
        }),
      Promise.resolve([])
    );

    return emitter;
  }
}
