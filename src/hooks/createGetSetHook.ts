import { useRequestContext } from "./useRequestContext";

export function createGetSetHook<T>(
  key: string,
  initialValue?: T
): [T | null, (value: T) => void] {
  const [value, setValue] = useRequestContext<T>(key, initialValue);
  return [value, setValue];
}
