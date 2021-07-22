interface EventListener<T extends Event> {
  (event: T): void;
}

export default class Emitter<
  Events extends { [type: string]: Event } = Record<string, Event>
> {
  private delegate: DocumentFragment;

  constructor() {
    this.delegate = document.createDocumentFragment();
  }

  addEventListener<T extends string>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    this.delegate.addEventListener(type, listener);
  }

  dispatchEvent<T extends keyof Events>(event: Events[T]): boolean {
    return this.delegate.dispatchEvent(event);
  }

  removeEventListener<T extends string>(
    type: T,
    listener: EventListener<Events[T]>
  ): void {
    this.delegate.removeEventListener(type, listener);
  }
}
