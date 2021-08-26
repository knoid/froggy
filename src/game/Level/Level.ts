import AlphaPicture from "../AlphaPicture";
import { AlphaAnimation, Orientation } from "../Animation";
import ArcadeMenu from "../ArcadeMenu";
import Button from "../Button";
import Curve from "../Curve";
import Frog from "../Frog";
import Picture, { PointerEvents } from "../Picture";
import Resources from "../Resources";
import Scene from "../Scene";
import BallsOnCurve from "./BallsOnCurve";
import Sparkles from "./Sparkles";

export default class Level extends Scene {
  private background: Picture;
  private ballsOnCurve: BallsOnCurve[];
  private curves: Curve[];
  private frog: Frog;
  private sparkles: Scene;
  private menuButton: Button;

  constructor(private resources: Resources, stage: number) {
    super();

    const scenarioId = resources.levels.stages[stage][0];
    const graphics = resources.levels.graphics[scenarioId];

    this.curves = [graphics.curve, graphics.curve2]
      .filter((curve) => curve)
      .map((curveId) => resources.curve(`${scenarioId}/${curveId}`));

    const holeCenter = resources.image("hole").width / 2;
    const pitHoles = this.curves.map((curve) => {
      const lastPoint = curve.points.slice(-1)[0];
      return new AlphaPicture(
        resources,
        "hole",
        lastPoint[0] - holeCenter,
        lastPoint[1] - holeCenter
      );
    });

    const pitCoverCenter = resources.image("pitCover").width / 2;
    const pitCovers = this.curves.flatMap((curve) => {
      const lastPoint = curve.points.slice(-1)[0];
      return new AlphaAnimation(
        resources,
        "pitCover",
        lastPoint[0] - pitCoverCenter,
        lastPoint[1] - pitCoverCenter,
        12,
        Orientation.vertical
      );
    });

    this.background = new Picture(resources, `${scenarioId}/${graphics.image}`);
    this.background.addEventListener("click", this.onBackgroundClick);

    this.frog = new Frog(resources, graphics.gx, graphics.gy);
    this.sparkles = new Sparkles(resources, this.curves);
    this.sparkles.addEventListener("remove", this.onSparklesRemove);

    const menuBar = new AlphaPicture(resources, "menuBar");
    menuBar.pointerEvents = PointerEvents.None;

    this.menuButton = new Button(resources, "menuButton", 538, 3);
    this.menuButton.addEventListener("click", this.onMenuButtonClick);

    const difficultyId = resources.levels.difficulty[stage][0];
    const settings = resources.levels.settings[difficultyId];
    this.ballsOnCurve = this.curves.map(
      (curve, i) => new BallsOnCurve(resources, curve, settings, pitCovers[i])
    );

    this.addEventListener("mousemove", this.onMouseMove);

    this.addActors([
      this.background,
      this.frog,
      this.sparkles,
      ...pitHoles,
      ...pitCovers,
      ...this.ballsOnCurve,
      menuBar,
      new AlphaPicture(resources, "toadLives", 26, 3),
      new AlphaPicture(resources, "toadLives", 52, 3),
      this.menuButton,
    ]);
  }

  logic(timeDiff: number): void {
    this.frog.logic(timeDiff);
    if (this.sparkles) this.sparkles.logic(timeDiff);
    this.ballsOnCurve.forEach((ballsOnCurve) => ballsOnCurve.logic(timeDiff));
  }

  remove(): void {
    super.remove();
    this.removeEventListener("mousemove", this.onMouseMove);
    this.background.removeEventListener("click", this.onBackgroundClick);
    this.menuButton.removeEventListener("click", this.onMenuButtonClick);

    // if user leaves before sparkles finish
    if (this.sparkles) {
      this.sparkles.removeEventListener("remove", this.onSparklesRemove);
    }
  }

  private onBackgroundClick = () => {
    if (this.sparkles) {
      this.sparkles.remove();
    }
  };

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
    this.removeActor(this.sparkles);
    this.sparkles.removeEventListener("remove", this.onSparklesRemove);
    this.sparkles = null;

    this.ballsOnCurve.forEach((ballsOnCurve) => {
      ballsOnCurve.active = true;
    });
  };
}
