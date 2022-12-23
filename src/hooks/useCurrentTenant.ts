import { CurrentTenant } from "lib/auth/CurrentTenant";
import { createGetSetHook, GetSetHookReturnValue } from "./createGetSetHook";

const KEY = "__currentTenant__";

export function useCurrentTenant(
  initialValue?: CurrentTenant
): GetSetHookReturnValue<CurrentTenant> {
  return createGetSetHook<CurrentTenant>(KEY, initialValue);
}
