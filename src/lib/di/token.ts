import { interfaces } from "inversify";

/**
 * A token is a unique identifier for a service.
 */
export type Token<T = unknown> = interfaces.ServiceIdentifier<T>;

/**
 * Creates a token with the given id.
 * @template T The type of the token.
 * @param id The id of the token.
 * @returns A token that uniquely identifies a service.
 */
export function token<T>(id: string): Token<T> {
  return Symbol.for(id);
}
