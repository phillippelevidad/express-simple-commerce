import { GetSetHookReturnValue, createGetSetHook } from "./createGetSetHook";

const KEY = "__dbFilterByCurrentUser__";

export function useDbFilterByCurrentUser(
  filterByCurrentUser = true
): GetSetHookReturnValue<boolean> {
  return createGetSetHook<boolean>(KEY, filterByCurrentUser);
}
