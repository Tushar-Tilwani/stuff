/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const memoMap = new Map();

  return function (...args) {
    const key = args.join();
    if (memoMap.has(key)) {
      return memoMap.get(key);
    }
    const result = fn(...args);
    memoMap.set(key, result);
    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
