/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubArrayLen = function (nums, k) {
  const len = nums.length;
  const sum = nums.reduce((acc, v) => acc + v, 0);
  if (sum === k) {
    return nums.length;
  }

  const leftSum = [];
  const rightSum = [];

  for (let i = 0; i < len; i++) {
    leftSum[i] = nums[i] + (leftSum[i - 1] ?? 0);
  }
  for (let i = len - 1; i >= 0; i--) {
    rightSum[i] = nums[i] + (rightSum[i + 1] ?? 0);
  }
  const result = [0];
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j >= i; j--) {
      const tempSum = sum - ((leftSum[i - 1] ?? 0) + (rightSum[j + 1] ?? 0));
      if (tempSum === k) {
        result[0] = Math.max(result[0], j - i + 1);
      }
    }
  }
  return result[0];
};
