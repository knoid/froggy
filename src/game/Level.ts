import AlphaPicture from "./AlphaPicture";
import ArcadeMenu from "./ArcadeMenu";
import Button from "./Button";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Level extends Scene {
  private menuButton: Button;

  constructor(resources: Resources, stage: number) {
    super(resources);

    const scenarioId = resources.levels.stages[stage][0];
    const graphics = resources.levels.graphics[scenarioId];

    this.menuButton = new Button(resources, "menuButton", 538, 3);
    this.menuButton.addEventListener("click", this.onMenuButtonClick);

    this.addActors([
      new Picture(resources, `${scenarioId}/${graphics.image}`),
      new AlphaPicture(resources, "menuBar"),
      new AlphaPicture(resources, "toadLives", 26, 3),
      new AlphaPicture(resources, "toadLives", 52, 3),
      this.menuButton,
    ]);
  }

  remove(): void {
    super.remove();
    this.menuButton.removeEventListener("click", this.onMenuButtonClick);
  }

  private onMenuButtonClick = () => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new ArcadeMenu(this.resources) })
    );
  };
}
