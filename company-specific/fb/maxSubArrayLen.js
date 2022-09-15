/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubArrayLen = function (nums, k) {
    const sum = nums.reduce((acc, v) => acc + v, 0);
    if (sum === k) {
      return nums.length;
    }
  const result = [0];

  const len = nums.length;
  for (let bucketSize = nums.length; bucketSize > 0; bucketSize--) {
    for (let startIndex = 0; startIndex <= len - bucketSize; startIndex++) {
      let tempSum = 0;
      for (let i = startIndex; i < bucketSize; i++) {
        tempSum += nums[i];
      }
      if (tempSum === k) {
        result[0] = Math.max(result[0], bucketSize);
      }
    }
  }

  return result[0];
};
