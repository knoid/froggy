export default class Settings {
  colors: number;
  fireSpeed: number;
  mergeSpeed: number;
  reloadDelay: number;
  repeat: number;
  score: number;
  speed: number;

  /** Amount of balls the level starts with. */
  start: number;

  constructor(element: Element) {
    this.colors = Number(element.getAttribute("colors"));
    this.fireSpeed = Number(element.getAttribute("fireSpeed"));
    this.mergeSpeed = Number(element.getAttribute("mergeSpeed"));
    this.reloadDelay = Number(element.getAttribute("reloadDelay"));
    this.repeat = Number(element.getAttribute("repeat"));
    this.score = Number(element.getAttribute("score"));
    this.speed = Number(element.getAttribute("speed"));
    this.start = Number(element.getAttribute("start"));
  }
}
