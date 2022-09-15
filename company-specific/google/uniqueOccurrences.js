/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const freqMap = arr.reduce((acc, val) => {
    if (!acc.has(val)) {
      acc.set(val, 0);
    }
    return acc.set(val, acc.get(val) + 1);
  }, new Map());
  const values = Array.from(freqMap.values());
  return new Set(values).size === values.length;
};
