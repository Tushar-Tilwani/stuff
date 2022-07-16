import React, { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  // Write your code here.
  const timeoutId = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!Number.isFinite(delay)) {
      return;
    }
    timeoutId.current = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      // Every time delay changes component unmounts and remounts. This function runs
      clearInterval(timeoutId.current);
    };
  }, [delay]);
}

// Do not edit the line below.
exports.useInterval = useInterval;
