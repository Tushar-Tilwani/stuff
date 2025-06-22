function curry(callback) {
  // Write your code here.
  return (function func(...baseArgs) {
    return (...args) => {
      if (args.length === 0) {
        return callback(...baseArgs);
      }
      return func(...baseArgs, ...args);
    };
  })();
}

// Do not edit the line below.
exports.curry = curry;
