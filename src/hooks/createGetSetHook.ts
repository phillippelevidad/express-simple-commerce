import { useRequestContext } from "./useRequestContext";

export type GetSetHookReturnValue<T> = [T | null, (value: T) => void];

/**
 * Creates a hook that can be used to get and set a value in the request context.
 * @param key Key to use to get and set the value.
 * @param initialValue Initial value to set if the value is not set in the request context.
 * @returns A tuple containing the value and a setter function.
 * @example
 * export function useCurrentTenant(
 *   initialValue?: CurrentTenant
 * ): [CurrentTenant | null, (value: CurrentTenant) => void] {
 *   return createGetSetHook<CurrentTenant>(KEY, initialValue);
 * }
 */
export function createGetSetHook<T>(
  key: string,
  initialValue?: T
): GetSetHookReturnValue<T> {
  const [value, setValue] = useRequestContext<T>(key, initialValue);
  return [value, setValue];
}
