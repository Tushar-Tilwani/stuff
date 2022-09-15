/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let result = 1;
  let prev = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    const curr = nums[i];
    if (curr > prev) {
      count++;
      result = Math.max(count, result);
    } else {
      count = 1;
    }
    prev = curr;
  }
  return result;
};
