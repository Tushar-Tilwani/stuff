// https://leetcode.com/problems/house-robber/
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const TABLE = { "-2": 0, "-1": 0, "0": nums[0], "1": nums[1] };
  const len = nums.length;
  for (let i = 2; i < len; i++) {
    TABLE[i] = nums[i] + Math.max(TABLE[i - 2], TABLE[i - 3]);
  }
  return Math.max(TABLE[len - 2], TABLE[len - 1]) || 0;
};

console.log(rob([]));

