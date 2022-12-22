import { ScopedContainer } from "lib/di/ScopedContainer";
import { EventBus } from "./events/EventBus";
import { EventBusImpl } from "./events/EventBusImpl";
import { TOKENS } from "./TOKENS";

ScopedContainer.postConfigure((container) => {
  container.bind<EventBus>(TOKENS.EventBus).to(EventBusImpl).inSingletonScope();
});
