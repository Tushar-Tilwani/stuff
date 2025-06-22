/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const leftProduct = [];
  for (let i = 0; i < nums.length; i++) {
    leftProduct[i] = (leftProduct[i - 1] ?? 1) * (nums[i - 1] ?? 1);
  }

  const rightProduct = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    rightProduct[i] = (rightProduct[i + 1] ?? 1) * (nums[i + 1] ?? 1);
  }

  const result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = leftProduct[i] * rightProduct[i];
  }

  return result;
};
