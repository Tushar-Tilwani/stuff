function curry(callback) {
  const wrapperFunc = function (finalArgs) {
    return (...args) => {
      if (args.length === 0) {
        return callback(...finalArgs);
      }
      return wrapperFunc([...finalArgs, ...args]);
    };
  };

  return wrapperFunc([]);
}

// Do not edit the line below.
exports.curry = curry;
