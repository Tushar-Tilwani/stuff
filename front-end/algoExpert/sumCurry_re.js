function getSum(...finalArgs) {
  return (...args) => {
    if (args.length === 0) {
      return finalArgs.reduce((acc, v) => acc + v, 0);
    }
    return getSum(...finalArgs, ...args);
  };
}

const sum = getSum();

const sum4 = sum(1)(3);

console.log("sum", sum4(2)());

console.log("sum", sum4(1)());
