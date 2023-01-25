function debounce(callback, delay, immediate = false) {
  // Write your code here.
  let timeoutId = null;
  return function (...params) {
    if (immediate && timeoutId === null) {
      callback.apply(this, params);
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        callback.apply(this, params);
      }
    }, delay);
  };
}

// Do not edit the line below.
exports.debounce = debounce;
