import { CurrentTenant } from "lib/auth/CurrentTenant";
import { useCurrentTenant } from "./useCurrentTenant";
import { useCurrentUser } from "./useCurrentUser";

/**
 * Returns a function that can be used to build the props for an aggregate root.
 * @returns A function that can be used to build the props for an aggregate root.
 */
export function useBuildAggregateRootProps() {
  return () => ({
    tenantId: getCurrentTenantOrThrow().id,
    createdBy: getCurrentUserOrThrow().id,
    updatedBy: getCurrentUserOrThrow().id,
  });
}

function getCurrentTenantOrThrow(
  errorMessage = "CurrentTenant was not set for the request"
): CurrentTenant | never {
  const [tenant] = useCurrentTenant();
  if (!tenant) throw new Error(errorMessage);
  return tenant;
}

function getCurrentUserOrThrow(
  errorMessage = "CurrentUser was not set for the request"
): CurrentTenant | never {
  const [user] = useCurrentUser();
  if (!user) throw new Error(errorMessage);
  return user;
}
