/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let result = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum === k) {
      result++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    sum -= nums[i];
    if (sum === k) {
      result++;
    }
  }
  return result;
};

console.log(subarraySum([1, 2, 3], 3));
