/**
 * @param {number[]} nums
 * @return {number}
 */
var repeatedNTimes = function (nums) {
  let result = null;
  let count = 0;
  for (const num of nums) {
    if (count == 0) {
      result = num;
      count = 1;
      continue;
    }
    count = num === result ? count + 1 : count - 1;
  }
  return result;
};
