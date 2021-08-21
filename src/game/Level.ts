import AlphaPicture from "./AlphaPicture";
import { AlphaAnimation, Orientation } from "./Animation";
import ArcadeMenu from "./ArcadeMenu";
import Button from "./Button";
import Frog from "./Frog";
import Picture from "./Picture";
import Resources from "./Resources";
import Scene from "./Scene";
import Sparkles from "./Sparkles";

export default class Level extends Scene {
  private frog: Frog;
  private sparkles: Scene;
  private menuButton: Button;

  constructor(protected resources: Resources, stage: number) {
    super();

    const scenarioId = resources.levels.stages[stage][0];
    const graphics = resources.levels.graphics[scenarioId];

    const curves = [graphics.curve, graphics.curve2]
      .filter((curve) => curve)
      .map((curveId) => resources.curve(`${scenarioId}/${curveId}`));

    const pitCoverCenter = resources.image("pitCover").width / 2;
    const holeCenter = resources.image("hole").width / 2;
    const pitCovers = curves.flatMap((curve) => {
        const lastPoint = curve.points.slice(-1)[0];

        return [
          new AlphaPicture(
            resources,
            "hole",
            lastPoint[0] - holeCenter,
            lastPoint[1] - holeCenter
          ),
          new AlphaAnimation(
            resources,
            "pitCover",
            lastPoint[0] - pitCoverCenter,
            lastPoint[1] - pitCoverCenter,
            12,
            Orientation.vertical
          ),
        ];
      });

    this.frog = new Frog(resources, graphics.gx, graphics.gy);
    this.sparkles = new Sparkles(resources, curves);
    this.sparkles.addEventListener("remove", this.onSparklesRemove);

    this.menuButton = new Button(resources, "menuButton", 538, 3);
    this.menuButton.addEventListener("click", this.onMenuButtonClick);

    this.addEventListener("mousemove", this.onMouseMove);

    this.addActors([
      new Picture(resources, `${scenarioId}/${graphics.image}`),
      this.frog,
      this.sparkles,
      ...pitCovers,
      new AlphaPicture(resources, "menuBar"),
      new AlphaPicture(resources, "toadLives", 26, 3),
      new AlphaPicture(resources, "toadLives", 52, 3),
      this.menuButton,
    ]);
  }

  logic(timeDiff: number): void {
    this.frog.logic(timeDiff);
    if (this.sparkles) this.sparkles.logic(timeDiff);
  }

  remove(): void {
    super.remove();
    this.removeEventListener("mousemove", this.onMouseMove);
    this.menuButton.removeEventListener("click", this.onMenuButtonClick);

    // if user leaves before sparkles finish
    if (this.sparkles)
      this.sparkles.removeEventListener("remove", this.onSparklesRemove);
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

  private onSparklesRemove = () => {
    this.actors.splice(this.actors.indexOf(this.sparkles), 1);
    this.sparkles.removeEventListener("remove", this.onSparklesRemove);
    this.sparkles = null;
  };
}
