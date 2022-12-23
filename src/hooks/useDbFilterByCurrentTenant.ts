import { GetSetHookReturnValue, createGetSetHook } from "./createGetSetHook";

const KEY = "__dbFilterByCurrentTenant__";

export function useDbFilterByCurrentTenant(
  filterByCurrentTenant = true
): GetSetHookReturnValue<boolean> {
  return createGetSetHook<boolean>(KEY, filterByCurrentTenant);
}
