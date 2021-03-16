import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetAll = () => {
      setValue('')
  }

  return {
    name,
    value,
    onChange,
    resetAll
    
  };
};
