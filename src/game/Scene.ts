import Drawable from "./Drawable";
import Emitter from "./Emitter";
import type Resources from "./Resources";

type EventsMap = {
  click: MouseEvent;
  remove: Event;
};

export default abstract class Scene
  extends Emitter<EventsMap>
  implements Drawable
{
  protected actors: Drawable[] = [];
  protected actorHovered: Drawable | null = null;

  constructor(protected resources: Resources, public x = 0, public y = 0) {
    super();
    this.addActors(this.setup());
    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("mousemove", this.onMouseMove);
    this.addEventListener("mouseout", this.onMouseOut);
    this.addEventListener("mouseover", this.onMouseOver);
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
    return !!this.findActor(x, y);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logic(timeDiff: number): void {
    // this will get overwritten by scenes
  }

  setup(): Drawable[] {
    return [];
  }

  remove(): void {
    for (const actor of this.actors) {
      actor.remove();
    }
    this.dispatchEvent(new Event("remove"));
    this.removeEventListener("mousedown", this.onMouseDown);
    this.removeEventListener("mousemove", this.onMouseMove);
    this.removeEventListener("mouseout", this.onMouseOut);
    this.removeEventListener("mouseover", this.onMouseOver);
    this.removeEventListener("mouseup", this.onMouseUp);
  }

  private onMouseDown = (e: MouseEvent): void => {
    const actor = this.findActor(e.clientX, e.clientY);
    if (actor) {
      actor.dispatchEvent(this.newMouseEvent("mousedown", e));
    }
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (e.buttons > 0) {
      if (this.actorHovered) {
        this.actorHovered.dispatchEvent(this.newMouseEvent("mousemove", e));
      }
    } else {
      const actor = this.findActor(e.clientX, e.clientY);
      if (actor) {
        actor.dispatchEvent(this.newMouseEvent("mousemove", e));
      }
      if (actor !== this.actorHovered) {
        if (this.actorHovered) {
          this.actorHovered.dispatchEvent(this.newMouseEvent("mouseout", e));
          this.actorHovered = null;
        }
        if (actor) {
          actor.dispatchEvent(this.newMouseEvent("mouseover", e));
          this.actorHovered = actor;
        }
      }
    }
  };

  private onMouseOut = (e: MouseEvent): void => {
    if (this.actorHovered && e.buttons === 0) {
      this.actorHovered.dispatchEvent(this.newMouseEvent("mouseout", e));
      this.actorHovered = null;
    }
  };

  private onMouseOver = (e: MouseEvent): void => {
    const actor = this.findActor(e.clientX, e.clientY);
    if (actor) {
      actor.dispatchEvent(this.newMouseEvent("mouseover", e));
    }
  };

  private onMouseUp = (e: MouseEvent): void => {
    if (this.actorHovered) {
      this.actorHovered.dispatchEvent(this.newMouseEvent("mouseup", e));
      const actor = this.findActor(e.clientX, e.clientY);
      if (this.actorHovered === actor) {
        this.actorHovered.dispatchEvent(this.newMouseEvent("click", e));
      } else if (actor) {
        actor.dispatchEvent(this.newMouseEvent("mouseover", e));
      }
    }
  };

  protected findActor(x: number, y: number): Drawable | undefined {
    const relativeX = x - this.x;
    const relativeY = y - this.y;
    return [...this.actors]
      .reverse()
      .find((actor) => actor.isPointInside(relativeX, relativeY));
  }

  private newMouseEvent(type: string, e: MouseEvent) {
    return new MouseEvent(type, {
      buttons: e.buttons,
      clientX: e.clientX - this.x,
      clientY: e.clientY - this.y,
    });
  }
}
