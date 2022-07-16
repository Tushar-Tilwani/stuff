function debounce(callback, delay, immediate = false) {
  // Write your code here.
  let timeoutId = null;
  return function (...args) {
    const boundCallback = callback.bind(this);
    clearTimeout(timeoutId);

    if (!immediate) {
      // Run on trail
      timeoutId = setTimeout(() => {
        boundCallback(...args);
        timeoutId = null;
      }, delay);
      return;
    }
    // Immediate true;
    if (timeoutId === null) {
      // if timeout cleared run immediately
      boundCallback(...args);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };
}

// Do not edit the line below.
exports.debounce = debounce;
