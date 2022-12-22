import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<Map<string, unknown>>();

export function withRequestContext(callback: () => void) {
  asyncLocalStorage.run(new Map<string, unknown>(), callback);
}

export function getRequestContextValue(key: string) {
  const storeMap = getStoreMapOrThrow();
  return storeMap.get(key);
}

export function setRequestContextValue<TValue = unknown>(
  key: string,
  value: TValue
) {
  const storeMap = getStoreMapOrThrow();
  storeMap.set(key, value);
}

function getStoreMapOrThrow(): Map<string, unknown> | never {
  const storeMap = asyncLocalStorage.getStore();
  if (!storeMap)
    throw new Error(
      "Store is not initialized or in being called from outside of a request context."
    );
  return storeMap;
}
