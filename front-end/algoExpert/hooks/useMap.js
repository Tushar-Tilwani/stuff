import React from "react";

function useMap(initialValue = []) {
  // Write your code here.
  const map = React.useMemo(() => {
    return new Map();
  }, []);

  useEffect(() => {
    for (const [key, value] of initialValue) {
      map.set(key, value);
    }
  }, [initialValue]);

  const setFn = React.useCallback((key, value) => map.set(key, value), [map]);

  const deleteFn = React.useCallback((key) => map.delete(key), [map]);

  const clearFn = React.useCallback(() => map.clear(), [map]);

  return { map, set: setFn, delete: deleteFn, clear: clearFn };
}

// Do not edit the line below.
exports.useMap = useMap;
