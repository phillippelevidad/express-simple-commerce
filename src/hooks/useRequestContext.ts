import {
  getRequestContextValue,
  setRequestContextValue,
} from "lib/requestContext/requestContext";

/**
 * A React-like hook that returns a value from the request context, and a setter function to set the value.
 * @param key Key to use to get and set the value in the request context.
 * @param initialValue Initial value to set if the value is not set in the request context.
 * @returns A tuple containing the value and a setter function.
 */
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
