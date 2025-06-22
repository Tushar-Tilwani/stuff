/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubArrayLen = function (nums, k) {
  const len = nums.length;
  const prefixSum = [];
  const result = [0];
  const map = new Map();
  for (let i = 0; i < len; i++) {
    prefixSum[i] = nums[i] + (prefixSum[i - 1] ?? 0);
    const key = prefixSum[i] - k;
    if (prefixSum[i] === k) {
      result[0] = Math.max(result[0], i + 1);
    }
    if (map.has(key)) {
      result[0] = Math.max(result[0], i - map.get(key) + 1);
    }
    map.set(prefixSum[i], i);
  }

  return result[0];
};
