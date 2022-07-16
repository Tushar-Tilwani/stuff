function throttle(callback, delay) {
  // Write your code here.
  let firstCall = 0;
  let timeoutId = null;
  const func = function (...args) {
    let timePast = Date.now() - firstCall;
    let delayRemaining = delay - timePast;
    if (delayRemaining < 0) {
      firstCall = Date.now();
      callback.call(this, ...args);
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(this, ...args);
      firstCall = 0;
      timeoutId = null;
    }, delayRemaining);
  };

  func.cancel = () => {
    clearTimeout(timeoutId);
    firstCall = 0;
    timeoutId = null;
  };

  return func;
}

// Do not edit the line below.
exports.throttle = throttle;
