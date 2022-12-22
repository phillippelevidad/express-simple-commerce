import { getRequestId } from "middlewares/requestContext";
import { ScopedContainer } from "../lib/di/ScopedContainer";
import { Token } from "../lib/di/token";

export function useDependency<TDependency = unknown>(
  token: Token<TDependency>
): TDependency {
  console.log("Request id", getRequestId());
  const container = ScopedContainer.for(getRequestId());
  return container.get(token);
}
