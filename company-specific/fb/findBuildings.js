/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
  const result = [];
  const len = heights.length - 1;
  let max = -Infinity;
  for (let i = len; i >= 0; i--) {
    if (heights[i] > max) {
      result.push(i);
      max = heights[i];
    }
  }
  return result.sort((a, b) => heights[a] - heights[b]);
};
