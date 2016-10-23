type StreamListenerFn<EventType> = (type: EventType) => any;
type SubscriptionCancelFn = () => boolean;

class Stream<EventType> {
  constructor(private listeners: Map<String, Set<StreamListenerFn>>) {}

  listen(
      eventName: String,
      listener: StreamListenerFn<EventType>): StreamSubscription<EventType> {
    let listenerSet = this.listeners.get(eventName) || new Set<EventType>();
    this.listeners.set(eventName, listenerSet.add(listener));
    return new StreamSubscription(this.removeListener(eventName, listener));
  }

  private removeListener(
      eventName: String,
      listener: StreamListenerFn<EventType>): SubscriptionCancelFn {
    return () => {
      if (!this.listeners.has(eventName) ||
          !this.listeners[eventName].has(listener)) {
        return false;
      }
      this.listeners[eventName].delete(listener);
      return true;
    }
  }
}

class StreamSubscription<EventType> {
  constructor(
      private subscriptionCanceler: SubscriptionCancelFn) {}

  cancel(): void {
    if (!this.subscriptionCanceler()) {
      throw new Error(
          'Cannot cancel a stream subscription that has already been canceled');
    }
  }
}

class StreamController<EventType> {
  private readonly listeners: Set<StreamListenerFn> = new Set();

  readonly stream: Stream<EventType> = new Stream(this.listeners);

  add(event: EventType): void {
    this.listeners.forEach((listener: StreamListenerFn<EventType>) => {
      listener(event);
    });
  }
}
