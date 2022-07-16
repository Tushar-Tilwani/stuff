import React from "react";

function useLocalStorage(key, initialValue) {
  // Write your code here.
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) ?? initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

// Do not edit the line below.
exports.useLocalStorage = useLocalStorage;
