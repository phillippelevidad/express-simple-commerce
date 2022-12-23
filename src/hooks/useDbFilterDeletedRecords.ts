import { GetSetHookReturnValue, createGetSetHook } from "./createGetSetHook";

const KEY = "__dbFilterDeletedRecords__";

export function useDbFilterDeletedRecords(
  filterDeletedRecords = true
): GetSetHookReturnValue<boolean> {
  return createGetSetHook<boolean>(KEY, filterDeletedRecords);
}
