import { EventCallback, SystemEventPayloadMap, SystemEventType } from "./types";

/**
 * Decoupled Domain Event Bus
 * Enables modules to communicate asynchronously via contracts without direct coupling.
 */
class SystemEventBus {
  private listeners: {
    [K in SystemEventType]?: Set<EventCallback<K>>;
  } = {};

  public subscribe<T extends SystemEventType>(
    eventType: T,
    callback: EventCallback<T>
  ): () => void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = new Set() as unknown as undefined;
    }
    const set = this.listeners[eventType] as Set<EventCallback<T>>;
    set.add(callback);

    // Return unsubscribe handler
    return () => {
      set.delete(callback);
    };
  }

  public publish<T extends SystemEventType>(
    eventType: T,
    payload: SystemEventPayloadMap[T]
  ): void {
    const set = this.listeners[eventType] as Set<EventCallback<T>> | undefined;
    if (set) {
      set.forEach((cb) => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`[EventBus] Error handling event ${eventType}:`, err);
        }
      });
    }
  }

  public clear(): void {
    this.listeners = {};
  }
}

export const eventBus = new SystemEventBus();
