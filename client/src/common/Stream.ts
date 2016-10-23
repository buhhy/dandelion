type StreamListenerFn<EventType> = (type: EventType) => any;
type SubscriptionCancelFn = () => boolean;
type Listeners<EventType> = Set<StreamListenerFn<EventType>>;
type ListenersStore<EventType> = Map<string, Listeners<EventType>>;

export class Stream<EventType> {
  constructor(private listeners: ListenersStore<EventType>) {}

  listen(
      eventName: string,
      listener: StreamListenerFn<EventType>): StreamSubscription<EventType> {
    let listenerSet = this.listeners.get(eventName) || new Set<StreamListenerFn<EventType>>();
    this.listeners.set(eventName, listenerSet.add(listener));

    return new StreamSubscription(this.removeListener(eventName, listener));
  }

  private removeListener(
      eventName: string,
      listener: StreamListenerFn<EventType>): SubscriptionCancelFn {
    return () => {
      let listenerSet = this.listeners.get(eventName);
      if (!listenerSet || listenerSet.has(listener)) return false;

      listenerSet.delete(listener);
      return true;
    }
  }
}

export class StreamSubscription<EventType> {
  constructor(
      private subscriptionCanceler: SubscriptionCancelFn) {}

  cancel(): void {
    if (!this.subscriptionCanceler()) {
      throw new Error(
          'Cannot cancel a stream subscription that has already been canceled');
    }
  }
}

export class StreamController<EventType> {
  private readonly listeners: ListenersStore<EventType> = new Map();

  readonly stream: Stream<EventType> = new Stream(this.listeners);

  add(eventName: string, event: EventType): void {
    let listenerSet = this.listeners.get(eventName);
    if (!listenerSet) return;

    listenerSet.forEach((listener) => {
      listener(event);
    });
  }
}
