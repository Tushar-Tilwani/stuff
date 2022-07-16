function curry(callback) {
  const wrapperFunc = function (finalArgs) {
    const curryFunc = function (...args) {
      if (args.length === 0) {
        return callback(...finalArgs);
      }
      return wrapperFunc([...finalArgs, ...args]);
    };

    return curryFunc;
  };

  return wrapperFunc([]);
}

// Do not edit the line below.
exports.curry = curry;
