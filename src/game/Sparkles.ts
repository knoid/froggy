import { Orientation } from "./Animation";
import Curve from "./Curve";
import { AnimationOnCurve } from "./OnCurve";
import Resources from "./Resources";
import Scene from "./Scene";

const sparklesSpeed = 15;
const totalSparkles = 28;

export default class Sparkles extends Scene {
  private elapsed = 0;
  private sparkles: AnimationOnCurve[][] = [];

  constructor(private resources: Resources, private curves: Curve[]) {
    super();
    this.sparkles = curves.map(() => []);
  }

  logic(timeDiff: number): void {
    this.elapsed += timeDiff;
    while (this.elapsed > sparklesSpeed) {
      this.elapsed -= sparklesSpeed;
      const sparkleSize = this.resources.image("sparkle").height;

      this.curves.forEach((curve, i) => {
        const sparkles = this.sparkles[i];
        if (sparkles.length < totalSparkles) {
          const sparkle = new AnimationOnCurve(
            this.resources,
            "sparkle",
            curve,
            14,
            Orientation.horizontal
          );
          sparkle.currentFrame = Math.floor(sparkles.length / 2);
          sparkle.fill([200, 200, 0]);
          this.addActors([sparkle]);
          sparkles.push(sparkle);
        }

        sparkles.forEach((sparkle) => {
          sparkle.position += sparkleSize;
        });
      });

      // this animation has finished when the last sparkle of every curve has an
      // invalid position
      const finished = this.sparkles.every((sparkles) =>
        Number.isNaN(sparkles.slice(-1)[0].x)
      );
      if (finished) {
        this.remove();
      }
    }
  }
}
