import { logger } from "./constants";
import Drawable from "./Drawable";
import Emitter from "./Emitter";
import type Resources from "./Resources";

type EventsMap = {
  click: MouseEvent;
  remove: Event;
};

const log = logger.extend("scene");

export default abstract class Scene
  extends Emitter<EventsMap>
  implements Drawable
{
  protected actors: Drawable[] = [];

  constructor(protected resources: Resources, public x = 0, public y = 0) {
    super();
    this.addActors(this.setup());
    this.addEventListener("click", this.onClick);
    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("mousemove", this.onMouseMove);
    this.addEventListener("mouseup", this.onMouseUp);
  }

  addActors(actors: Drawable[], priority = 0): void {
    this.actors.splice(this.actors.length - 1 - priority, 0, ...actors);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);

    for (const actor of this.actors) {
      actor.draw(ctx);
    }

    ctx.restore();
  }

  isPointInside(x: number, y: number): boolean {
    return [...this.actors]
      .reverse()
      .some((actor) => actor.isPointInside(x, y));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logic(timeDiff: number): void {
    // this will get overwritten by scenes
  }

  onClick = this.forwardMouseEvent("click");
  onMouseDown = this.forwardMouseEvent("mousedown");
  onMouseMove = this.forwardMouseEvent("mousemove");
  onMouseUp = this.forwardMouseEvent("mouseup");

  setup(): Drawable[] {
    return [];
  }

  remove(): void {
    for (const actor of this.actors) {
      actor.remove();
    }
    this.dispatchEvent(new Event("remove"));
    this.removeEventListener("click", this.onClick);
    this.removeEventListener("mousedown", this.onMouseDown);
    this.removeEventListener("mousemove", this.onMouseMove);
    this.removeEventListener("mouseup", this.onMouseUp);
  }

  private forwardMouseEvent(type: string) {
    return ({ clientX, clientY }: MouseEvent) => {
      this.actors.forEach((actor) => {
        const event = new MouseEvent(type, { clientX, clientY });
        actor.dispatchEvent(event);
      });
    };
  }
}
