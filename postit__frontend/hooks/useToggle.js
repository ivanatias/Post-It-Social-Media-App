import { useState, useCallback } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = useCallback(
    () => setValue((prevValue) => !prevValue),
    []
  );

  return { value, toggleValue };
};
