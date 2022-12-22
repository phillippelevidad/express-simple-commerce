/**
 * An update action is a command that can be applied to a resource.
 * It is a combination of an action (name) and a payload.
 * The payload is a set of properties that are required to perform the action.
 * @template TPayload The type of the payload.
 * @example
 * {
 *   action: "setFirstName",
 *   payload: {
 *     firstName: "John"
 *   }
 * }
 */
export interface UpdateAction<
  TPayload extends Record<string, unknown> = Record<string, unknown>
> {
  action: string;
  payload: TPayload;
}
