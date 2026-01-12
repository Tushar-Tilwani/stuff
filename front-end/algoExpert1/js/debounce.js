function debounce(callback, delay, immediate = false) {
  // Write your code here.
  let timeoutId = null;
  return function (...args) {
    if (immediate) {
      if (timeoutId === null) {
        callback.call(this, ...args);
      }
      clearTimeout(timeoutId);
      // Lock any callback function till delay
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
      return;
    }
    // go for tail if immediate is false
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(this, ...args);
      timeoutId = null;
    }, delay);
  };
}

// Do not edit the line below.
exports.debounce = debounce;
