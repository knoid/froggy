import Dialog from "./Dialog";
import DialogButton from "./DialogButton";
import Resources from "./Resources";
import Slider from "./Slider";

export default class OptionsDialog extends Dialog {
  private doneButton: DialogButton;

  constructor(resources: Resources) {
    super(resources, 392, 330, "OPTIONS");

    this.doneButton = new DialogButton(resources, 30, 247, 320, "Done");
    this.doneButton.addEventListener("click", this.onDone);

    this.addActors([
      // new Checkbox(resources, 30, 100, 'Fullscreen')
      new Slider(resources, 392 / 2, 66, "Music volume"),
      new Slider(resources, 392 / 2, 106, "Sound effects"),
      // new Checkbox(35, 146, 'Custom cursors'),
      // new Checkbox(35, 196, 'Special effects and animations'),
      this.doneButton,
    ]);
  }

  private onDone = () => {
    this.show = false;
  };

  remove(): void {
    super.remove();
    this.doneButton.removeEventListener("click", this.onDone);
  }
}
