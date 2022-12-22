import { injectable } from "inversify";
import { EventBus } from "./EventBus";

@injectable()
export class EventBusImpl implements EventBus {
  async publish(event: Event): Promise<void> {
    console.log(
      "Fake implementation of an Event Bus. Event data was:",
      JSON.stringify(event)
    );
    return Promise.resolve();
  }
}
