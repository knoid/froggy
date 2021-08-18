import JSZip, { JSZipObject } from "jszip";
import parseCurve, { CurvePoints } from "../shared/parseCurve";
import { logger } from "./constants";
import Curve from "./Curve";
import Emitter from "./Emitter";
import Font from "./Font";
import Graphics from "./levels/Graphics";

const log = logger.extend("resources");

type LoaderEventMap = {
  progress: ProgressEvent;
  error: Event;
};

type FontName =
  | "Arial9Bold"
  | "Arial12Bold"
  | "Cancun8"
  | "Cancun10"
  | "Cancun12"
  | "Cancun13"
  | "Cancun22"
  | "CancunFloat14"
  | "NativeAlien48"
  | "NativeAlienExtended16"
  | "NativeAlienExtended18";

const imagesPathRegex = /^(fonts|images|levels)\/(.+)\.(gif|jpg)$/i;
const fontsPathRegex = /^(fonts)\/(.+)\.txt$/i;
const curvePathRegex = /^(levels)\/(.+)\.dat$/i;

export default class Resources {
  private curves: Record<string, CurvePoints> = {};
  // @ts-expect-error it will be populated before usage
  fonts: Record<FontName, Font> = {};
  private freeCanvases: HTMLCanvasElement[] = [];
  private images: Record<string, HTMLImageElement> = {};
  levels: {
    difficulty: string[][];
    graphics: Record<string, Graphics>;
    stages: string[][];
  };

  constructor(private fs: JSZip) {}

  curve(name: string): Curve {
    return new Curve(this.curves[name.toLowerCase()]);
  }

  image(name: string): HTMLImageElement {
    return this.images[name.toLowerCase()];
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

  async loadCurve(curveFile: JSZipObject): Promise<void> {
    const curveId = curveFile.name.match(curvePathRegex)[2];
    const fileContents = await curveFile.async("arraybuffer");
    this.curves[curveId.toLowerCase()] = parseCurve(fileContents);
  }

  async loadFont(fontName: FontName): Promise<Font> {
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
          this.images[basename.toLowerCase()] = image;
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

  async loadLevels(): Promise<void> {
    const levelsData = await this.fs.file("levels/levels.xml").async("text");
    const parser = new DOMParser();
    const xml = parser.parseFromString(levelsData, "text/html");

    const stageProgression = xml.getElementsByTagName("StageProgression")[0];
    const stages: string[][] = [];
    const difficulty: string[][] = [];
    for (let i = 0, n = stageProgression.attributes.length; i < n; i++) {
      const attribute = stageProgression.attributes.item(i);
      const [, type, stage] = attribute.name.match(/(diffi|stage)(\d+)/);
      const array = type === "diffi" ? difficulty : stages;
      array.splice(Number(stage) - 1, 0, attribute.value.split(","));
    }

    const graphicsElements = xml.getElementsByTagName("graphics");
    const graphics: Record<string, Graphics> = {};
    for (const graphicsElement of Array.from(graphicsElements)) {
      graphics[graphicsElement.id] = new Graphics(graphicsElement);
    }
    this.levels = { graphics, stages, difficulty };
  }

  loadAll(): Emitter<LoaderEventMap> {
    const emitter = new Emitter<LoaderEventMap>();
    const images = this.fs.file(imagesPathRegex);
    const fonts = this.fs.file(fontsPathRegex);
    const curves = this.fs.file(curvePathRegex);
    const total = images.length + fonts.length + curves.length + 1;
    let loaded = 0;

    function dispatchProgress() {
      loaded++;
      log("progress %d out of %d", loaded, total);
      const event = new ProgressEvent("progress", { loaded, total });
      emitter.dispatchEvent(event);
    }

    Promise.resolve()
      .then(() =>
        this.serialLoader(images, async (image) => {
          await this.loadImage(image.name);
          dispatchProgress();
        })
      )
      .then(() =>
        this.serialLoader(fonts, async (fontFile) => {
          const basename = fontFile.name.match(fontsPathRegex)[2];
          await this.loadFont(basename as FontName);
          dispatchProgress();
        })
      )
      .then(() =>
        this.serialLoader(curves, async (curveFile) => {
          await this.loadCurve(curveFile);
          dispatchProgress();
        })
      )
      .then(() => {
        this.loadLevels();
        dispatchProgress();
      })
      .catch((err) => emitter.dispatchEvent(err));

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
