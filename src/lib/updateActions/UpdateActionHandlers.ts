/* eslint-disable @typescript-eslint/no-explicit-any */

import { UpdateActionHandler } from "./UpdateActionHandler";

/**
 * A map of update action handlers.
 * @template TEntity The type of the entity.
 * @example
 * const handlers: UpdateActionHandlers<User> = {
 *   setFirstName: (user, payload) => {
 *     user.firstName = payload.firstName;
 *   },
 *   setLastName: (user, payload) => {
 *     user.lastName = payload.lastName;
 *   }
 * };
 */
export interface UpdateActionHandlers<TEntity> {
  [action: string]: UpdateActionHandler<TEntity, any>;
}
