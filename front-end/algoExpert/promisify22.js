function promisify(callback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const handler = (error, value) => {
        if (error !== null) {
          reject(error);
          return;
        }
        resolve(value);
      };
      callback.call(this, ...args, handler);
    });
  };
}

// Do not edit the line below.
exports.promisify = promisify;
