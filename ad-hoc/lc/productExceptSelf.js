/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let currentProduct = 1;

  const startArr = [];
  for (let i = 0; i < nums.length; i++) {
    currentProduct = currentProduct * (nums[i - 1] ?? 1);
    startArr[i] = currentProduct;
  }

  const endArr = [];
  currentProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    currentProduct = currentProduct * (nums[i + 1] ?? 1);
    endArr[i] = currentProduct;
  }

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    result[i] = startArr[i] * endArr[i];
  }

  return result;
};
