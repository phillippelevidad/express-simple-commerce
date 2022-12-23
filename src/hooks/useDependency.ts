import { getRequestId } from "middlewares/requestContext";
import { ScopedContainer } from "../lib/di/ScopedContainer";
import { Token } from "../lib/di/token";

/**
 * Resolves a dependency from the scoped container.
 * @param token Token of the dependency to resolve.
 * @returns The resolved dependency.
 * @throws {Error} If the dependency is not registered.
 */
export function useDependency<TDependency = unknown>(
  token: Token<TDependency>
): TDependency | never {
  console.log("Request id", getRequestId());
  const container = ScopedContainer.for(getRequestId());
  return container.get(token);
}
