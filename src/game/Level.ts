import AlphaPicture from "./AlphaPicture";
import ArcadeMenu from "./ArcadeMenu";
import Button from "./Button";
import Frog from "./Frog";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";

export default class Level extends Scene {
  private frog: Frog;
  private menuButton: Button;

  constructor(protected resources: Resources, stage: number) {
    super();

    const scenarioId = resources.levels.stages[stage][0];
    const graphics = resources.levels.graphics[scenarioId];

    this.frog = new Frog(resources, graphics.gx, graphics.gy);

    this.menuButton = new Button(resources, "menuButton", 538, 3);
    this.menuButton.addEventListener("click", this.onMenuButtonClick);

    this.addEventListener("mousemove", this.onMouseMove);

    this.addActors([
      new Picture(resources, `${scenarioId}/${graphics.image}`),
      this.frog,
      new AlphaPicture(resources, "menuBar"),
      new AlphaPicture(resources, "toadLives", 26, 3),
      new AlphaPicture(resources, "toadLives", 52, 3),
      this.menuButton,
    ]);
  }

  remove(): void {
    super.remove();
    this.removeEventListener("mousemove", this.onMouseMove);
    this.menuButton.removeEventListener("click", this.onMenuButtonClick);
  }

  private onMenuButtonClick = () => {
    this.dispatchEvent(
      new CustomEvent("sceneChange", { detail: new ArcadeMenu(this.resources) })
    );
  };

  protected onMouseMove(e: MouseEvent): void {
    super.onMouseMove(e);
    const frog = this.frog;
    frog.rotation =
      Math.atan2(frog.y + 54 - e.clientY, frog.x + 54 - e.clientX) +
      Math.PI / 2;
  }
}
