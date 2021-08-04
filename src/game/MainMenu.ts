import AlphaPicture from "./AlphaPicture";
import Button from "./Button";
import { logger, WIN_WIDTH } from "./constants";
import Drawable from "./Drawable";
import FrogEyes from "./FrogEyes";
import OptionsDialog from "./OptionsDialog";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class MainMenu extends Scene {
  private optionsButton: Button;
  private optionsDialog: OptionsDialog;
  private sky: Picture[];
  private sunGlow: Picture;

  constructor(resources: Resources) {
    super(resources);
    const r = this.resources;
    this.sky = [-1, 0, 1].map((pos) => new Picture(r, "mmsky", 520 * pos, 0));
    this.sunGlow = new Picture(r, "_mmsunglow", -70, -70);
    this.sunGlow.fill([255, 255, 0]);

    const changeUser = r.fonts["Cancun10"].createText(
      "Main",
      "center",
      38,
      "(If this is not you, click here.)"
    );
    changeUser.fill([92, 56, 0]);

    this.optionsDialog = new OptionsDialog(r);
    this.optionsButton = new Button(
      r,
      "mmOPTIONSBUTTON",
      "_mmOPTIONSBUTTON",
      418,
      236
    );
    this.optionsButton.addEventListener("click", this.onOptionsButtonClick);

    this.addActors([
      ...this.sky,
      new AlphaPicture(r, "mmscreen", "_mmscreen"),
      this.sunGlow,
      new AlphaPicture(r, "mmsun", "_mmsun"),
      r.fonts["NativeAlienExtended16"].createText(
        "Main",
        "center",
        -7,
        "Welcome to Zuma, person!"
      ),
      changeUser,
      new FrogEyes(r, 190, 331),
      new Button(r, "mmARCADEBUTTON", "_mmARCADEBUTTON", 452, 64),
      new Button(r, "mmGAUNTLETBUTTON", "_mmGAUNTLETBUTTON", 436, 153),
      this.optionsButton,
      new Button(r, "mmMOREGAMESBUTTON", "_mmMOREGAMESBUTTON", 394, 306),
      new Button(r, "mmQUITBUTTON", "_mmQUITBUTTON", 496, 314),
      this.optionsDialog,
    ]);
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

  remove(): void {
    super.remove();
    this.optionsButton.removeEventListener("click", this.onOptionsButtonClick);
  }

  private onOptionsButtonClick = () => {
    this.optionsDialog.show = true;
  };
}
