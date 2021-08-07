interface EventListener<T extends Event> {
  (event: T): void;
}

type StringKeys<T> = Extract<keyof T, string>;

export default class Emitter<
  Events extends Record<string, Event> = Record<string, never>
> extends EventTarget {
  addEventListener<T extends StringKeys<Events>>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    super.addEventListener(type, listener);
  }

  dispatchEvent(event: Event): boolean {
    return super.dispatchEvent(event);
  }

  removeEventListener<T extends StringKeys<Events>>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    super.removeEventListener(type, listener);
  }
}
