/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
  const sortedNum = nums.sort((a, b) => a - b);
  const result = [];
  let minRange = lower;
  let maxRange = lower;
  for (let i = 0; i <= sortedNum.length; i++) {
    const num = sortedNum[i];
    if (minRange === num) {
      minRange += 1;
      continue;
    }
    maxRange = num - 1 || upper;
    if (minRange === maxRange) {
      result.push([minRange]);
    } else {
      result.push([minRange, maxRange]);
    }
    minRange = num + 1;
  }
  return result.map((arr) => arr.join("->"));
};
