import { useState, useEffect } from "react";

const useDebouncer = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};

export default useDebouncer;
