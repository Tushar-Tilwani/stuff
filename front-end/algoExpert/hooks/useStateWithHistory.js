import React, { useRef, useState } from "react";

function useStateWithHistory(initialState) {
  const [state, setState] = useState(initialState);
  const historyRef = useRef([initialState]);
  const currentIndexRef = useRef(0);
  const history = historyRef.current;

  const goBack = () => {
    if (currentIndexRef.current > 0) {
      currentIndexRef.current -= 1;
      setState(history[currentIndexRef.current]);
    }
  };

  const goForward = () => {
    if (currentIndexRef.current < history.length - 1) {
      currentIndexRef.current += 1;
      setState(history[currentIndexRef.current]);
    }
  };

  const setValue = (val) => {
    setState(val);
    currentIndexRef.current = history.length;
    history.push(val);
  };

  return [state, setValue, goBack, goForward, history];
}

// Do not edit the line below.
exports.useStateWithHistory = useStateWithHistory;
