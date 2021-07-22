import AlphaPicture from "./AlphaPicture";
import Button from "./Button";
import { logger, WIN_WIDTH } from "./constants";
import Drawable from "./Drawable";
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
      (pos) => new Picture(r, r.images["images/mmsky.jpg"], 520 * pos, 0)
    );
    this.sunGlow = new Picture(r, r.images["images/_mmsunglow.jpg"], -70, -70);
    this.sunGlow.fill([255, 255, 0]);

    r.getFont("Cancun10").then((cancun10) => {
      const changeUser = cancun10.createText(
        "Main",
        "center",
        38,
        "(If this is not you, click here.)"
      );
      changeUser.fill([92, 56, 0]);
      this.addActors([changeUser]);
    });

    r.getFont("NativeAlienExtended16").then((nativeAlienExtended16) => {
      const welcomeText = nativeAlienExtended16.createText(
        "Main",
        "center",
        -7,
        "Welcome to Zuma, person!"
      );
      this.addActors([welcomeText]);
    });

    return [
      ...super.setup(),
      ...this.sky,
      new AlphaPicture(
        r,
        r.images["images/mmscreen.jpg"],
        r.images["images/_mmscreen.gif"]
      ),
      this.sunGlow,
      new AlphaPicture(
        r,
        r.images["images/mmsun.gif"],
        r.images["images/_mmsun.gif"]
      ),
      new AlphaPicture(
        r,
        r.images["images/mmeyeleft.gif"],
        r.images["images/_mmeyeleft.gif"],
        213,
        352
      ),
      new AlphaPicture(
        r,
        r.images["images/mmeyeright.gif"],
        r.images["images/_mmeyeright.gif"],
        272,
        340
      ),
      new Button(
        r,
        r.images["images/mmARCADEBUTTON.jpg"],
        r.images["images/_mmARCADEBUTTON.gif"],
        452,
        64
      ),
      new Button(
        r,
        r.images["images/mmGAUNTLETBUTTON.jpg"],
        r.images["images/_mmGAUNTLETBUTTON.gif"],
        436,
        153
      ),
      new Button(
        r,
        r.images["images/mmOPTIONSBUTTON.jpg"],
        r.images["images/_mmOPTIONSBUTTON.gif"],
        418,
        236
      ),
      new Button(
        r,
        r.images["images/mmMOREGAMESBUTTON.jpg"],
        r.images["images/_mmMOREGAMESBUTTON.gif"],
        394,
        306
      ),
      new Button(
        r,
        r.images["images/mmQUITBUTTON.jpg"],
        r.images["images/_mmQUITBUTTON.gif"],
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
