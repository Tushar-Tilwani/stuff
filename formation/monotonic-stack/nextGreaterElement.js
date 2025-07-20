/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  // Modiefied monotonic stack
  const stack = [];
  const resultMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    const num = nums2[i];
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      const value = stack.pop();
      resultMap.set(value, num);
    }
    stack.push(num);
  }
  return nums1.map((num) => resultMap.get(num) ?? -1);
};
