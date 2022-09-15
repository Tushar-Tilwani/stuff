/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
var customSortString = function (order, s) {
  const indexMap = order.split("").reduce((acc, char, index) => {
    acc.set(char, index);
    return acc;
  }, new Map());

  return s
    .split("")
    .sort((a, b) => (indexMap.get(a) ?? 0) - (indexMap.get(b) ?? 0))
    .join("");
};
