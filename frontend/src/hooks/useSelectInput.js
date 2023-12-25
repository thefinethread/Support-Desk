import { useState } from "react";

const useSelectInput = (initialValue, options) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => setValue(e.target.value);

  return {
    value,
    onChange: handleChange,
  };
};

export default useSelectInput;
