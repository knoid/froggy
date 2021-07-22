import AlphaPicture from "./AlphaPicture";
import { logger } from "./constants";
import Picture from "./Picture";
import Scene from "./Scene";

const log = logger.extend("loadingscreen");

export default class LoadingScreen extends Scene {
  private progress = 0;
  private loadingBar: Picture;
  private playNow: Picture;

  private onProgress = (e: ProgressEvent) => {
    this.progress = e.loaded / e.total;
  };

  async loadResources(): Promise<void> {
    const r = this.resources;
    const loadingScreenImage = await r.loadImage("images/loadingscreen.jpg");
    const loadingScreenBackground = new Picture(r, loadingScreenImage);

    const loadingBarImage = await r.loadImage("images/LoaderBar.gif");
    const loadingBarAlphaImage = await r.loadImage("images/_LoaderBar.gif");
    this.loadingBar = new AlphaPicture(
      r,
      loadingBarImage,
      loadingBarAlphaImage,
      129,
      349
    );

    const cancunFloat14 = await r.getFont("CancunFloat14");
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

    const emitter = r.loadAllImages();
    emitter.addEventListener("progress", this.onProgress);

    this.addActors([loadingScreenBackground, this.playNow]);
  }

  logic(timeDiff: number): void {
    super.logic(timeDiff);
    this.playNow.show = this.progress === 1;
  }

  onPlayNow = ({ clientX, clientY }: MouseEvent): void => {
    if (this.playNow.isPointInside(clientX, clientY)) {
      log("onPlayNow");
      this.remove();
    }
  };

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.loadingBar.draw(ctx, 0, 0, Math.round(this.progress * 399), 44);
  }

  remove(): void {
    super.remove();
    this.loadingBar.remove();
  }
}
