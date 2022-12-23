import { v4 as uuid } from "uuid";
import { AggregateRootDocument } from "lib/aggregateRoot/AggregateRootDocument";

/**
 * Base class for domain events.
 * @template TPayload The type of the event payload.
 */
export abstract class DomainEvent<
  TPayload extends AggregateRootDocument = AggregateRootDocument
> {
  public readonly eventId = uuid();

  /**
   * Creates a new domain event.
   * @param eventName Name of the event, e.g. "UserCreated"
   * @param aggregateType Type of the aggregate, e.g. "User"
   * @param aggregateId Id of the aggregate, e.g. "123"
   * @param payload Payload of the event; the aggregate itself, e.g. { firstName: "John", lastName: "Doe" }
   */
  constructor(
    public readonly eventName: string,
    public readonly aggregateType: string,
    public readonly aggregateId: string,
    public readonly payload: TPayload
  ) {}
}
