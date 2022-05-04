/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var twoSumLessThanK = function (nums, k) {
  let result = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = nums[i] + nums[j];
      if (sum < k) {
        result = Math.max(result, sum);
      }
    }
  }
  return isFinite(result) ? result : -1;
};
