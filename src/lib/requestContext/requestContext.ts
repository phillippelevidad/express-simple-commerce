import { AsyncLocalStorage } from "async_hooks";

const context = new AsyncLocalStorage<Map<string, unknown>>();

/**
 * Creates a new request context, which is a map of key-value
 * pairs that can be accessed from anywhere in the request.
 */
export function withRequestContext(callback: () => void) {
  context.run(new Map<string, unknown>(), callback);
}

/**
 * Ends the current request context.
 */
export function endRequestContext() {
  context.exit(() => {
    return;
  });
}

/**
 * Gets the value for the given key from the current request context.
 * @param key The key to get the value for.
 * @returns The value for the given key.
 */
export function getRequestContextValue<T = unknown>(key: string): T {
  const storeMap = getStoreMapOrThrow();
  return storeMap.get(key) as T;
}

/**
 * Sets the value for the given key in the current request context.
 * @param key The key to set the value for.
 * @param value The value to set.
 */
export function setRequestContextValue<TValue = unknown>(
  key: string,
  value: TValue
): void {
  const storeMap = getStoreMapOrThrow();
  storeMap.set(key, value);
}

function getStoreMapOrThrow(): Map<string, unknown> | never {
  const storeMap = context.getStore();
  if (!storeMap)
    throw new Error(
      "Store is not initialized or in being called from outside of a request context."
    );
  return storeMap;
}
