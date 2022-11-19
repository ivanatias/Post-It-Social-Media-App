import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = (val) => {
    if (val) {
      setValue(val);
    } else {
      setValue((prevValue) => !prevValue);
    }
  };

  return { value, toggleValue };
};
