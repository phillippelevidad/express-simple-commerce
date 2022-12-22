/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A function that handles an update action.
 * @template TEntity The type of the entity.
 * @template TPayload The type of the payload.
 * @param entity The entity to update.
 * @param payload The payload of the update action.
 * @returns A promise that resolves when the update action has been handled.
 * @example
 * const handlers: UpdateActionHandlers<User> = {
 *  setFirstName: (user, payload) => {
 *    user.firstName = payload.firstName;
 *  }
 * };
 */
export type UpdateActionHandler<TEntity, TPayload = any> = (
  entity: TEntity,
  payload: TPayload
) => void | never | Promise<void | never>;
