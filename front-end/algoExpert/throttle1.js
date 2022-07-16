function throttle(callback, delay) {
  // Write your code here.
  let timerId = null;
  let scopedArgs = null;

  const func = function (...args) {
    if (timerId == null) {
      callback.call(this, ...args);
    } else {
      scopedArgs = args;
    }

    timerId = setTimeout(() => {
      if (scopedArgs !== null) {
        callback.call(this, ...scopedArgs);
      }
      timerId = null;
      scopedArgs = null;
    }, delay);
  };

  func.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
    scopedArgs = null;
  };

  return func;
}

// Do not edit the line below.
exports.throttle = throttle;
