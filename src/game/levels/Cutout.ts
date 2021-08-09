export default class Cutout {
  image: string;
  priority: number;
  x: number;
  y: number;

  constructor(element: Element) {
    this.image = element.getAttribute("image");
    this.priority = Number(element.getAttribute("pri"));
    this.x = Number(element.getAttribute("x"));
    this.y = Number(element.getAttribute("y"));
  }
}
