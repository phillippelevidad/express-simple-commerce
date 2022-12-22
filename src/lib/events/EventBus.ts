/**
 * Component that allows publishing events to a set of subscribers.
 */
export interface EventBus {
  /**
   * Publishes an event to all subscribers.
   * @param event The event to publish.
   * @returns A promise that resolves when the event has been published.
   */
  publish(event: Event): Promise<void>;
}
