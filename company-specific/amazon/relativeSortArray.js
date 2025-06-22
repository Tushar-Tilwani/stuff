/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  const orderMap = arr2.reduce((acc, val, index) => {
    acc.set(val, index);
    return acc;
  }, new Map());

  return arr1.sort((a, b) => {
    if (orderMap.has(a) && orderMap.has(b)) {
      return orderMap.get(a) - orderMap.get(b);
    }
    if (orderMap.has(a)) {
      return -1;
    }
    if (orderMap.has(b)) {
      return 1;
    }
    return a - b;
  });
};
