interface EventListener<T extends Event> {
  (event: T): void;
}

export default class Emitter<
  Events extends { [type: string]: Event } = Record<string, Event>
> extends EventTarget {
  addEventListener<T extends string>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    super.addEventListener(type, listener);
  }

  dispatchEvent<T extends keyof Events>(event: Events[T]): boolean {
    return super.dispatchEvent(event);
  }

  removeEventListener<T extends string>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    super.removeEventListener(type, listener);
  }
}
