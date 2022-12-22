import { CurrentTenant } from "lib/auth/CurrentTenant";
import { useCurrentTenant } from "./useCurrentTenant";
import { useCurrentUser } from "./useCurrentUser";

export function useBuildAggregateRootProps() {
  return () => ({
    tenantId: getCurrentTenantOrThrow().id,
    createdBy: getCurrentUserOrThrow().id,
    updatedBy: getCurrentUserOrThrow().id,
  });
}

export function getCurrentTenantOrThrow(
  errorMessage = "CurrentTenant was not set for the request"
): CurrentTenant | never {
  const [tenant] = useCurrentTenant();
  if (!tenant) throw new Error(errorMessage);
  return tenant;
}

export function getCurrentUserOrThrow(
  errorMessage = "CurrentUser was not set for the request"
): CurrentTenant | never {
  const [user] = useCurrentUser();
  if (!user) throw new Error(errorMessage);
  return user;
}
