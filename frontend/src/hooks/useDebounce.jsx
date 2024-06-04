import { useEffect, useState } from "react";

export default function useDebounce(initialValue = "", delay = 10000) {
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [initialValue, delay]);
  return debounceValue;
}
