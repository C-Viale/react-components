import { Dispatch, SetStateAction, useCallback, useState } from "react";

type UseToogleResult = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

export function useToogle(defaultValue: boolean): UseToogleResult {
  const [value, override] = useState(defaultValue);

  const toggle = useCallback(() => override((prev) => !prev), []);

  return [value, toggle, override];
}
