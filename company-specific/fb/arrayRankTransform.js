/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  const rankMap = Array.from(new Set(arr).values())
    .sort((a, b) => a - b)
    .reduce((acc, val, rank) => {
      acc.set(val, rank + 1);
      return acc;
    }, new Map());

  return arr.map((val) => rankMap.get(val));
};
