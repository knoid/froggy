import BackgroundAlpha from "./BackgroundAlpha";
import Cutout from "./Cutout";
import translate from "./translate";
import TreasurePoint from "./TreasurePoint";

export default class Graphics {
  curve: string;
  curve2?: string;
  image: string;
  displayName: string;
  gx: number;
  gy: number;

  backgroundAlphas: BackgroundAlpha[];
  cutouts: Cutout[];
  treasurePoints: TreasurePoint[];

  constructor(element: Element) {
    this.curve = element.getAttribute("curve");
    this.curve2 = element.getAttribute("curve2");
    this.image = element.getAttribute("image");
    this.displayName = element.getAttribute("dispname");
    this.gx = Number(element.getAttribute("gx"));
    this.gy = Number(element.getAttribute("gy"));

    this.backgroundAlphas = translate(
      element,
      "backgroundAlpha",
      BackgroundAlpha
    );
    this.cutouts = translate(element, "cutout", Cutout);
    this.treasurePoints = translate(element, "treasurePoint", TreasurePoint);
  }
}
