/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let timeoutId = null;
  return function (...args) {
    if(timeoutId !== null) {
      return;
    }
    func.call(this, ...args);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, wait);
  }
}