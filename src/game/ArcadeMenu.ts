import AlphaPicture from "./AlphaPicture";
import Button from "./Button";
import { WIN_WIDTH } from "./constants";
import MainMenu from "./MainMenu";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class ArcadeMenu extends Scene {
  private sky: Picture[];
  private mainMenuButton: Button;

  constructor(resources: Resources) {
    super(resources);

    this.sky = [
      new Picture(resources, "advSky", -640, 0),
      new Picture(resources, "advSky", 0, 0),
    ];

    this.mainMenuButton = new Button(resources, "advMainMenuButton", 0, 438);
    this.mainMenuButton.addEventListener("click", this.onMainMenuButtonClick);

    this.addActors([
      ...this.sky,
      new AlphaPicture(resources, "advBack", 0, 0),
      new AlphaPicture(resources, "advTemple3", 395, 115),
      new AlphaPicture(resources, "advTemple2", 0, 115),
      new AlphaPicture(resources, "advTemple1", 0, 188),
      new Picture(resources, "advStage", 289, 381),

      // new Door(resources, "advDoor1A", 226, 300, 1, 'TEMPLE OF ZUKULKAN', true),
      // new Door(resources, "advDoor1B", 297, 270, 2, 'TEMPLE OF ZUKULKAN', true),
      // new Door(resources, "advDoor1C", 366, 300, 3, 'TEMPLE OF ZUKULKAN', true),
      // new Door(resources, "advDoor2A",   0, 170, 4, 'QUETZAL QUATL'),
      // new Door(resources, "advDoor2B",  69, 162, 5, 'QUETZAL QUATL'),
      // new Door(resources, "advDoor2C", 120, 160, 6, 'QUETZAL QUATL'),
      // new Door(resources, "advDoor3A", 452, 144, 7, 'POPO POYOLLI'),
      // new Door(resources, "advDoor3B", 508, 144, 8, 'POPO POYOLLI'),
      // new Door(resources, "advDoor3C", 567, 145, 9, 'POPO POYOLLI'),

      new AlphaPicture(resources, "advTitle", 0, 0),
      new AlphaPicture(resources, "advHighScore", 456, 0),
      this.mainMenuButton,
      new Button(resources, "advPlayButton", 543, 441),
    ]);
  }

  logic(timeDiff: number): void {
    for (const sky of this.sky) {
      sky.x += timeDiff * 0.02;
      if (sky.x > WIN_WIDTH) {
        sky.x -= sky.width * 2;
      }
    }
  }

  remove(): void {
    super.remove();
    this.mainMenuButton.removeEventListener(
      "click",
      this.onMainMenuButtonClick
    );
  }

  private onMainMenuButtonClick = (): void => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new MainMenu(this.resources) })
    );
  };
}
