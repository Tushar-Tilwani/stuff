import { useRef, useState, useEffect } from "react";

const getFormattedTime = (time) => {
  const mill = Math.floor((time % 1000) / 10);
  const secs = Math.floor(time / 1000);
  return `${secs}s ${mill}ms`;
};

const useStopWatch = (precision = 10) => {
  const startTime = useRef(null);
  const timeoutIdRef = useRef(null);
  const elaspedTimeRef = useRef(0);
  const [time, setTime] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(timeoutIdRef.current);
    };
  }, []);

  const startTimer = () => {
    if (isTimerOn) {
      return;
    }
    setIsTimerOn(true);
    startTime.current = Date.now() - elaspedTimeRef.current;
    timeoutIdRef.current = setInterval(() => {
      elaspedTimeRef.current = Date.now() - startTime.current;
      setTime(elaspedTimeRef.current);
    }, precision);
  };
  const pauseTimer = () => {
    setIsTimerOn(false);
    clearInterval(timeoutIdRef.current);
  };
  const resetTimer = () => {
    clearInterval(timeoutIdRef.current);
    startTime.current = null;
    timeoutIdRef.current = null;
    elaspedTimeRef.current = 0;
    setTime(0);
    setIsTimerOn(false);
  };

  return { startTimer, pauseTimer, resetTimer, time, isTimerOn };
};

export default function Stopwatch() {
  const { startTimer, pauseTimer, resetTimer, time, isTimerOn } = useStopWatch();
  console.log(time);
  return (
    <div>
      <p>{getFormattedTime(time)}</p>
      <div>
        <button onClick={isTimerOn ? pauseTimer : startTimer}>{isTimerOn ? "Stop" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
