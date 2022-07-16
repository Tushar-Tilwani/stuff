import React, { useCallback, useEffect } from "react";

function reducer(state, action) {
  if (action.type !== "resize") {
    throw new Error();
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

function useWindowSize() {
  // Write your code here.
  const initialState = { width: window.innerWidth, height: window.innerHeight };
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchUpdate = useCallback(
    () =>
      dispatch({
        type: "resize",
      }),
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("resize", dispatchUpdate);
    return () => {
      window.removeEventListener("resize", dispatchUpdate);
    };
  }, [dispatchUpdate]);

  return state;
}

// Do not edit the line below.
exports.useWindowSize = useWindowSize;
