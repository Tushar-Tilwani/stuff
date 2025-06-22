// https://leetcode.com/problems/partition-equal-subset-sum/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const targetSum = nums.reduce((acc, v) => acc + v, 0) / 2;
  if (!Number.isInteger(targetSum)) {
    return false;
  }
  return helper(nums, 0, targetSum);
};

function helper(s, index, targetSum, memo = new Map()) {
  const current = index + "" + targetSum;
  if (memo.has(current)) {
    return memo.get(current);
  }
  if (targetSum === 0) {
    return true;
  }
  if (targetSum < 0 || index === s.length) {
    return false;
  }

  const result =
    helper(s, index + 1, targetSum - s[index], memo) ||
    helper(s, index + 1, targetSum, memo);

  memo.set(current, result);

  return result;
}
