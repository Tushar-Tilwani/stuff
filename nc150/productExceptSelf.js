/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const length = nums.length;
  let prefix = 1;
  let suffix = 1;
  const result = new Array(length).fill(1);

  for (let i = 1; i < length; i++) {
    prefix = nums[i - 1] * prefix;
    result[i] = prefix;
  }

  for (let i = length - 2; i >= 0; i--) {
    suffix = nums[i + 1] * suffix;
    result[i] = result[i] * suffix;
  }

  return result;
};

console.log(productExceptSelf([-1, 1, 0, -3, 3]));
