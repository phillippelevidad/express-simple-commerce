import { useRequestContext } from "./useRequestContext";

const KEY = "__dbFilterByCurrentUser__";

export function useDbFilterByCurrentUser(
  filterByCurrentUser = true
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useRequestContext<boolean>(
    KEY,
    filterByCurrentUser
  );

  return [value!, setValue];
}
