function memoize(callback, resolver) {
  const cache = new Map();
  const retFunc = (...args) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, callback(...args));
    }
    return cache.get(key);
  };

  retFunc.clear = () => cache.clear();

  retFunc.delete = (...args) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    cache.delete(key);
  };

  retFunc.has = (...args) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    return cache.has(key);
  };

  return retFunc;
}

// Do not edit the line below.
exports.memoize = memoize;
