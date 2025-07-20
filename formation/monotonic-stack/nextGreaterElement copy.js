/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const result = [];
  const stack = [];

  for (let i = 0; i < nums2.length; i++) {
    const num = nums2[i];
    while (stack.length > 0 && stack[stack.length - 1][0] < num) {
      const [, index] = stack.pop();
      result[index] = num;
    }
    stack.push([num, i]);
  }
  while (stack.length > 0) {
    const [, index] = stack.pop();
    result[index] = -1;
  }
  return result;
};
