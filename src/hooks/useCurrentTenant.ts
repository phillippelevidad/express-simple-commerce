import { CurrentTenant } from "lib/auth/CurrentTenant";
import { useRequestContext } from "./useRequestContext";

const KEY = "__currentTenant__";

export function useCurrentTenant(
  initialCurrentTenant?: CurrentTenant
): [CurrentTenant | null, (value: CurrentTenant) => void] {
  const [value, setValue] = useRequestContext<CurrentTenant>(
    KEY,
    initialCurrentTenant
  );

  return [value, setValue];
}
