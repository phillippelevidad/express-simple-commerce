import { CurrentUser } from "lib/auth/CurrentUser";
import { createGetSetHook, GetSetHookReturnValue } from "./createGetSetHook";

const KEY = "__currentUser__";

export function useCurrentUser(
  initialValue?: CurrentUser
): GetSetHookReturnValue<CurrentUser> {
  return createGetSetHook<CurrentUser>(KEY, initialValue);
}
