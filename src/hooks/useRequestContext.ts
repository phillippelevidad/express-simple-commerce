import {
  getRequestContextValue,
  setRequestContextValue,
} from "lib/requestContext/requestContext";

export function useRequestContext<TValue = unknown>(
  key: string,
  initialValue?: TValue
): [TValue, (value: TValue) => void] | never {
  if (getRequestContextValue(key) === undefined)
    setRequestContextValue(key, initialValue);
  return [
    (getRequestContextValue(key) ?? null) as TValue,
    setRequestContextValue.bind(null, key),
  ];
}
