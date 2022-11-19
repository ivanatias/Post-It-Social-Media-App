import { useState } from "react";

export const useField = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (e) => setValue(e.target.value);

  const resetField = () => setValue(initialValue);

  return { value, handleValueChange, resetField };
};
