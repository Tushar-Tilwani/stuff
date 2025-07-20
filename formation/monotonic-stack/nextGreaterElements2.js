/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const modifiedNums = [...nums, ...nums];
  const stack = [];
  const result = [];
  const len = modifiedNums.length;
  for (let i = 0; i < len; i++) {
    const num = modifiedNums[i];
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
  return result.slice(0, nums.length);
};
