import AlphaPicture from "./AlphaPicture";
import Button from "./Button";
import { WIN_WIDTH } from "./constants";
import Stage from "./Stage";
import MainMenu from "./MainMenu";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";
import Temple from "./Temple";
import Level from "./Level";

export default class ArcadeMenu extends Scene {
  private mainMenuButton: Button;
  private playButton: Button;
  private sky: Picture[];
  private temples: Temple[];
  private selectedStage: Stage;
  private selectedTemple: Temple;

  constructor(private resources: Resources) {
    super();

    this.sky = [
      new Picture(resources, "advSky", -640, 0),
      new Picture(resources, "advSky", 0, 0),
    ];

    this.mainMenuButton = new Button(resources, "advMainMenuButton", 0, 438);
    this.mainMenuButton.addEventListener("click", this.onMainMenuButtonClick);

    this.temples = [
      new Temple(resources, "advTemple3", 395, 115, "POPO POYOLLI", [
        new Stage(resources, "advDoor3A", 452, 144, 6, true),
        new Stage(resources, "advDoor3B", 508, 144, 7),
        new Stage(resources, "advDoor3C", 567, 145, 8),
      ]),

      new Temple(resources, "advTemple2", 0, 115, "QUETZAL QUATL", [
        new Stage(resources, "advDoor2A", 0, 170, 3),
        new Stage(resources, "advDoor2B", 69, 162, 4, true),
        new Stage(resources, "advDoor2C", 120, 160, 5),
      ]),

      new Temple(resources, "advTemple1", 0, 188, "TEMPLE OF ZUKULKAN", [
        new Stage(resources, "advDoor1A", 226, 300, 0, true),
        new Stage(resources, "advDoor1B", 297, 270, 1, true),
        new Stage(resources, "advDoor1C", 366, 300, 2, true),
      ]),
    ];
    this.selectedTemple = this.temples[this.temples.length - 1];
    this.selectedStage = this.selectedTemple.stages[0];
    this.selectedStage.selected = true;

    this.temples.forEach((temple) => {
      temple.addEventListener("click", this.onTempleClick);
      temple.stages.forEach((stage) => {
        stage.addEventListener("click", this.onStageClick);
        stage.addEventListener("dblclick", this.onStageDoubleClick);
      });
    });

    this.playButton = new Button(resources, "advPlayButton", 543, 441);
    this.playButton.addEventListener("click", this.onPlayButtonClick);

    this.addActors([
      ...this.sky,
      new AlphaPicture(resources, "advBack", 0, 0),
      ...this.temples,
      new Picture(resources, "advStage", 289, 381),
      new AlphaPicture(resources, "advTitle", 0, 0),
      new AlphaPicture(resources, "advHighScore", 456, 0),
      this.mainMenuButton,
      this.playButton,
    ]);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.selectedTemple.title.draw(ctx);
    this.selectedStage.numberText.draw(ctx);
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
    this.temples.forEach((temple) => {
      temple.removeEventListener("click", this.onTempleClick);
      temple.stages.forEach((stage) => {
        stage.removeEventListener("click", this.onStageClick);
        stage.removeEventListener("dblclick", this.onStageDoubleClick);
      });
    });
    this.playButton.removeEventListener("click", this.onPlayButtonClick);
  }

  private onStageClick = (e: MouseEvent) => {
    this.selectedStage.selected = false;
    this.selectedStage = e.relatedTarget as Stage;
    this.selectedStage.selected = true;
  };

  private onStageDoubleClick = (e: MouseEvent) => {
    this.onStageClick(e);
    this.onPlayButtonClick();
  };

  private onMainMenuButtonClick = () => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new MainMenu(this.resources) })
    );
  };

  private onPlayButtonClick = () => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", {
        detail: new Level(this.resources, this.selectedStage.number),
      })
    );
  };

  private onTempleClick = (e: MouseEvent) => {
    this.selectedTemple = e.relatedTarget as Temple;
  };
}
