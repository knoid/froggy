import AlphaPicture from "./AlphaPicture";
import ArcadeMenu from "./ArcadeMenu";
import Button from "./Button";
import { WIN_WIDTH } from "./constants";
import FrogEyes from "./FrogEyes";
import OptionsDialog from "./OptionsDialog";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class MainMenu extends Scene {
  private adventureButton: Button;
  private optionsButton: Button;
  private optionsDialog: OptionsDialog;
  private sky: Picture[];
  private sunGlow: Picture;

  constructor(resources: Resources) {
    super(resources);
    const r = this.resources;
    this.sky = [-1, 0, 1].map((pos) => new Picture(r, "mmSky", 520 * pos, 0));
    this.sunGlow = new Picture(r, "_mmSunGlow", -70, -70);
    this.sunGlow.fill([255, 255, 0]);

    const changeUser = r.fonts["Cancun10"].createText(
      "Main",
      "center",
      38,
      "(If this is not you, click here.)"
    );
    changeUser.fill([92, 56, 0]);

    this.adventureButton = new Button(r, "mmArcadeButton", 452, 64);
    this.adventureButton.addEventListener("click", this.onAdventureButtonClick);

    this.optionsDialog = new OptionsDialog(r);
    this.optionsButton = new Button(r, "mmOptionsButton", 418, 236);
    this.optionsButton.addEventListener("click", this.onOptionsButtonClick);

    this.addActors([
      ...this.sky,
      new AlphaPicture(r, "mmScreen"),
      this.sunGlow,
      new AlphaPicture(r, "mmSun"),
      r.fonts["NativeAlienExtended16"].createText(
        "Main",
        "center",
        -7,
        "Welcome to Zuma, person!"
      ),
      changeUser,
      new FrogEyes(r, 190, 331),
      this.adventureButton,
      new Button(r, "mmGauntletButton", 436, 153),
      this.optionsButton,
      new Button(r, "mmMoreGamesButton", 394, 306),
      new Button(r, "mmQuitButton", 496, 314),
      this.optionsDialog,
    ]);
  }

  logic(timeDiff: number): void {
    for (const sky of this.sky) {
      sky.x += timeDiff * 0.02;
      if (sky.x > WIN_WIDTH) {
        sky.x -= sky.width * 3;
      }
    }

    this.sunGlow.addRotation(timeDiff * 0.0008);
  }

  remove(): void {
    super.remove();
    this.adventureButton.removeEventListener(
      "click",
      this.onAdventureButtonClick
    );
    this.optionsButton.removeEventListener("click", this.onOptionsButtonClick);
  }

  private onAdventureButtonClick = () => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new ArcadeMenu(this.resources) })
    );
  };

  private onOptionsButtonClick = () => {
    this.optionsDialog.show = true;
  };
}
