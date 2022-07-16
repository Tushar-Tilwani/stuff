function getSum() {
  const wrapperFunc = function (finalArgs) {
    return (...args) => {
      if (args.length === 0) {
        return finalArgs.reduce((acc, v) => acc + v);
      }
      return wrapperFunc([...finalArgs, ...args]);
    };
  };

  return wrapperFunc([]);
}

const sum = getSum([]);

const sum4 = sum(1)(3);

console.log("sum", sum4(2)());

console.log("sum", sum4(1)());
