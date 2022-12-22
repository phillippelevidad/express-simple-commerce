import { useRequestContext } from "./useRequestContext";

const KEY = "__dbFilterByCurrentTenant__";

export function useDbFilterByCurrentTenant(
  filterByCurrentTenant = true
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useRequestContext<boolean>(
    KEY,
    filterByCurrentTenant
  );

  return [value!, setValue];
}
