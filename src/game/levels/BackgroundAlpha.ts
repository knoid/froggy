export default class BackgroundAlpha {
  image: string;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(element: Element) {
    this.image = element.getAttribute("image");
    this.x = Number(element.getAttribute("x"));
    this.y = Number(element.getAttribute("y"));
    this.vx = Number(element.getAttribute("vx"));
    this.vy = Number(element.getAttribute("vy"));
  }
}
