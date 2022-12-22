import { token } from "lib/di/token";
import { EventBus } from "./events/EventBus";

export const TOKENS = {
  EventBus: token<EventBus>("EventBus"),
};
