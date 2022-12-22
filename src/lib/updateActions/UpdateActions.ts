import { UpdateAction } from "./UpdateAction";

/**
 * A set of update actions.
 * The version is the version of the entity that the update actions should be applied to.
 * The actions are the update actions that should be applied to the entity.
 * @template TEntity The type of the entity.
 * @example
 * {
 *   version: 1,
 *   actions: [
 *     {
 *       action: "setFirstName",
 *       payload: {
 *         firstName: "John"
 *       }
 *     },
 *     {
 *       action: "setLastName",
 *       payload: {
 *       lastName: "Doe"
 *     }
 *   ]
 * }
 */
export interface UpdateActions {
  version: number;
  actions: UpdateAction[];
}
