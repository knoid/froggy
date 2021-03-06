import AlphaPicture from "./AlphaPicture";
import { logger } from "./constants";
import MainMenu from "./MainMenu";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

const log = logger.extend("loadingscreen");

export default class LoadingScreen extends Scene {
  private progress = 0;
  private loadingBar: Picture;
  private playNow: Picture;

  constructor(private resources: Resources) {
    super();
  }

  private onProgress = (e: ProgressEvent) => {
    this.progress = e.loaded / e.total;
  };

  async loadResources(): Promise<void> {
    const r = this.resources;
    await r.loadImage("images/loadingscreen.jpg");
    const loadingScreenBackground = new Picture(r, "loadingScreen");

    await r.loadImage("images/LoaderBar.gif");
    await r.loadImage("images/_LoaderBar.gif");
    this.loadingBar = new AlphaPicture(r, "loaderBar", 129, 349);

    const cancunFloat14 = await r.loadFont("CancunFloat14");
    await r.loadImage("fonts/CancunFloat14.gif");
    await r.loadImage("fonts/_CancunFloat14.gif");
    this.playNow = cancunFloat14.createText(
      "Main",
      "center",
      441,
      "Click here to play!"
    );
    this.playNow.show = false;
    this.playNow.addEventListener("click", this.onPlayNow);

    const emitter = r.loadAll();
    emitter.addEventListener("progress", this.onProgress);

    this.addActors([loadingScreenBackground, this.playNow]);
  }

  logic(timeDiff: number): void {
    super.logic(timeDiff);
    this.playNow.show = this.progress === 1;
  }

  onPlayNow = (): void => {
    log("onPlayNow");
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new MainMenu(this.resources) })
    );
  };

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.loadingBar.draw(ctx, 0, 0, Math.round(this.progress * 399), 44);
  }

  remove(): void {
    super.remove();
    this.loadingBar.remove();
    this.playNow.removeEventListener("click", this.onPlayNow);
  }
}
