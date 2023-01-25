function curry(callback) {
  // Write your code here.
  function func(...fullParams) {
    return (...params) => {
      if (params.length === 0) {
        return callback(...fullParams);
      }
      return func(...fullParams, ...params);
    };
  }

  return func();
}

// Do not edit the line below.
exports.curry = curry;
