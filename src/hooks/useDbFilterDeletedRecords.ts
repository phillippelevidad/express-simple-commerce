import { useRequestContext } from "./useRequestContext";

const KEY = "__dbFilterDeletedRecords__";

export function useDbFilterDeletedRecords(
  filterDeletedRecords = true
): [boolean, (value: boolean) => void] {
  const [value, setValue] = useRequestContext<boolean>(
    KEY,
    filterDeletedRecords
  );

  return [value!, setValue];
}
