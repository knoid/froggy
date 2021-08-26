import type { Coords2D, CurvePoints } from "../shared/parseCurve";

export default class Curve {
  angles: number[] = [0];
  points: CurvePoints = [];

  constructor(data: CurvePoints) {
    let lastPoint = data[0];
    this.points.push(lastPoint);
    for (let i = 1, n = data.length; i < n; i++) {
      const newPoint: Coords2D = [
        lastPoint[0] + data[i][0] / 100,
        lastPoint[1] + data[i][1] / 100,
      ];
      this.points.push(newPoint);
      this.angles.push(
        Math.atan2(lastPoint[1] - newPoint[1], lastPoint[0] - newPoint[0]) +
          Math.PI / 2
      );
      lastPoint = newPoint;
    }
  }
}
