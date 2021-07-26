import AlphaPicture from "./AlphaPicture";
import Button from "./Button";
import { logger, WIN_WIDTH } from "./constants";
import Drawable from "./Drawable";
import FrogEyes from "./FrogEyes";
import Picture from "./Picture";
import Scene from "./Scene";

const log = logger.extend("mainmenu");

export default class MainMenu extends Scene {
  private sky: Picture[];
  private sunGlow: Picture;

  setup(): Drawable[] {
    log("setup");
    const r = this.resources;
    this.sky = [-1, 0, 1].map(
      (pos) => new Picture(r, r.images["mmsky"], 520 * pos, 0)
    );
    this.sunGlow = new Picture(r, r.images["_mmsunglow"], -70, -70);
    this.sunGlow.fill([255, 255, 0]);

    const changeUser = r.fonts["Cancun10"].createText(
      "Main",
      "center",
      38,
      "(If this is not you, click here.)"
    );
    changeUser.fill([92, 56, 0]);

    return [
      ...super.setup(),
      ...this.sky,
      new AlphaPicture(r, r.images["mmscreen"], r.images["_mmscreen"]),
      this.sunGlow,
      new AlphaPicture(r, r.images["mmsun"], r.images["_mmsun"]),
      r.fonts["NativeAlienExtended16"].createText(
        "Main",
        "center",
        -7,
        "Welcome to Zuma, person!"
      ),
      changeUser,
      new FrogEyes(r, 190, 331),
      new Button(
        r,
        r.images["mmARCADEBUTTON"],
        r.images["_mmARCADEBUTTON"],
        452,
        64
      ),
      new Button(
        r,
        r.images["mmGAUNTLETBUTTON"],
        r.images["_mmGAUNTLETBUTTON"],
        436,
        153
      ),
      new Button(
        r,
        r.images["mmOPTIONSBUTTON"],
        r.images["_mmOPTIONSBUTTON"],
        418,
        236
      ),
      new Button(
        r,
        r.images["mmMOREGAMESBUTTON"],
        r.images["_mmMOREGAMESBUTTON"],
        394,
        306
      ),
      new Button(
        r,
        r.images["mmQUITBUTTON"],
        r.images["_mmQUITBUTTON"],
        496,
        314
      ),
    ];
  }

  logic(timeDiff: number): void {
    for (const sky of this.sky) {
      sky.x += timeDiff * 0.02;
      if (sky.x > WIN_WIDTH) {
        sky.x -= 520 * 3;
      }
    }

    this.sunGlow.addRotation(timeDiff * 0.0008);
  }
}
