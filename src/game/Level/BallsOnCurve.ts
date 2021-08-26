import { AlphaAnimation } from "../Animation";
import Curve from "../Curve";
import Settings from "../levels/Settings";
import { AlphaAnimationOnCurve } from "../OnCurve";
import Resources from "../Resources";
import Scene from "../Scene";
import Ball from "./Ball";

const pitOpensAt = 300;

export default class BallsOnCurve extends Scene {
  private balls: AlphaAnimationOnCurve[] = [];
  private initBalls: number;
  private speed: number;

  /** Wether to continue adding balls or not. */
  active = false;

  constructor(
    private resources: Resources,
    private curve: Curve,
    private settings: Settings,
    private pitCover: AlphaAnimation
  ) {
    super();
    this.initBalls = settings.start;
  }

  logic(timeDiff: number): void {
    this.speed -= ((this.speed - this.settings.speed) * timeDiff) / 250;

    let firstBall = this.balls.length > 0 && this.balls[0];
    if (!firstBall || firstBall.position > 32) {
      if (this.initBalls > 0) {
        this.initBalls--;
        this.speed =
          ((this.settings.speed * this.initBalls) / this.settings.start) * 30;
      }
      if (this.active) {
        firstBall = this.addBall();
      }
    }

    const lastBall = this.balls.length > 0 && this.balls.slice(-1)[0];
    const distanceToPit = this.curve.points.length - (lastBall?.position || 0);
    this.pitCover.currentFrame = Math.ceil(
      (Math.max(0, pitOpensAt - distanceToPit) * this.pitCover.framesCount) /
        pitOpensAt
    );

    // move balls
    if (firstBall) {
      const distance = (this.speed * timeDiff) / 20;
      firstBall.position += distance;
      for (let i = 1, n = this.balls.length; i < n; i++) {
        const previousBall = this.balls[i - 1];
        const currentBall = this.balls[i];
        const ballsOverlap = currentBall.position - previousBall.position - 33;
        currentBall.position += Math.max(0, -ballsOverlap);
      }
      this.active = this.balls.length < 20; // debug
    }
  }

  private addBall() {
    const color = Math.floor(Math.random() * this.settings.colors);
    const ball = new Ball(this.resources, color, this.curve);
    this.balls.unshift(ball);
    this.addActors([ball]);
    return ball;
  }
}
