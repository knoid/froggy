import Drawable from "./Drawable";
import Emitter from "./Emitter";
import Resources from "./Resources";

type EventsMap = {
  click: MouseEvent;
  dblclick: MouseEvent;
  mousedown: MouseEvent;
  mousemove: MouseEvent;
  mouseout: MouseEvent;
  mouseover: MouseEvent;
  mouseup: MouseEvent;
  remove: Event;
  sceneChange: CustomEvent;
};

type MouseEventType = {
  [K in keyof EventsMap]-?: EventsMap[K] extends MouseEvent ? K : never;
}[keyof EventsMap];

export default abstract class Scene<ExtraEventsMap = Record<string, never>>
  extends Emitter<ExtraEventsMap & EventsMap>
  implements Drawable
{
  protected actors: Drawable[] = [];
  protected actorHovered: Drawable | null = null;

  constructor(protected resources: Resources, public x = 0, public y = 0) {
    super();
    this.addEventListener("dblclick", this.onDoubleClick);
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

  private onDoubleClick(e: MouseEvent) {
    const actor = this.findActor(e.clientX, e.clientY);
    if (actor) {
      actor.dispatchEvent(this.newMouseEvent("dblclick", e, actor));
    }
  }

  private onMouseDown(e: MouseEvent) {
    const actor = this.findActor(e.clientX, e.clientY);
    if (actor) {
      actor.dispatchEvent(this.newMouseEvent("mousedown", e, actor));
    }
  }

  private onMouseMove(e: MouseEvent): void {
    if (e.buttons > 0) {
      if (this.actorHovered) {
        this.actorHovered.dispatchEvent(
          this.newMouseEvent("mousemove", e, this.actorHovered)
        );
      }
    } else {
      const actor = this.findActor(e.clientX, e.clientY);
      if (actor) {
        actor.dispatchEvent(this.newMouseEvent("mousemove", e, actor));
      }
      if (actor !== this.actorHovered) {
        if (this.actorHovered) {
          this.actorHovered.dispatchEvent(
            this.newMouseEvent("mouseout", e, this.actorHovered)
          );
          this.actorHovered = null;
        }
        if (actor) {
          actor.dispatchEvent(this.newMouseEvent("mouseover", e, actor));
          this.actorHovered = actor;
        }
      }
    }
  }

  private onMouseOut(e: MouseEvent) {
    if (this.actorHovered && e.buttons === 0) {
      this.actorHovered.dispatchEvent(
        this.newMouseEvent("mouseout", e, this.actorHovered)
      );
      this.actorHovered = null;
    }
  }

  private onMouseOver(e: MouseEvent) {
    const actor = this.findActor(e.clientX, e.clientY);
    if (actor) {
      actor.dispatchEvent(this.newMouseEvent("mouseover", e, actor));
    }
  }

  private onMouseUp(e: MouseEvent) {
    if (this.actorHovered) {
      this.actorHovered.dispatchEvent(
        this.newMouseEvent("mouseup", e, this.actorHovered)
      );
      const actor = this.findActor(e.clientX, e.clientY);
      if (this.actorHovered === actor) {
        this.actorHovered.dispatchEvent(
          this.newMouseEvent("click", e, this.actorHovered)
        );
      } else if (actor) {
        actor.dispatchEvent(this.newMouseEvent("mouseover", e, actor));
      }
    }
  }

  protected findActor(x: number, y: number): Drawable | undefined {
    const relativeX = x - this.x;
    const relativeY = y - this.y;
    return [...this.actors]
      .reverse()
      .find((actor) => actor.isPointInside(relativeX, relativeY));
  }

  private newMouseEvent(
    type: MouseEventType,
    e: MouseEvent,
    target: EventTarget
  ) {
    return new MouseEvent(type, {
      buttons: e.buttons,
      clientX: e.clientX - this.x,
      clientY: e.clientY - this.y,
      relatedTarget: target,
    });
  }
}
