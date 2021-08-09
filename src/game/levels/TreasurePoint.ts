export default class TreasurePoint {
  x: number;
  y: number;
  dist1: number | null;
  dist2: number | null;

  constructor(element: Element) {
    this.x = Number(element.getAttribute("x"));
    this.y = Number(element.getAttribute("y"));
    this.dist1 =
      element.getAttribute("dist1") && Number(element.getAttribute("dist1"));
    this.dist2 =
      element.getAttribute("dist2") && Number(element.getAttribute("dist2"));
  }
}
