import { CurrentUser } from "lib/auth/CurrentUser";
import { createGetSetHook } from "./createGetSetHook";

const KEY = "__currentUser__";

export function useCurrentUser(
  initialCurrentUser?: CurrentUser
): [CurrentUser | null, (value: CurrentUser) => void] {
  return createGetSetHook<CurrentUser>(KEY, initialCurrentUser);
}
