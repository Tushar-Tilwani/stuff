/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  const stack = [];
  let currMin = Infinity;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    while (stack.length > 0 && stack[stack.length - 1][0] <= num) {
      stack.pop();
    }
    // Check 132 pattern here
    const [maxValue, minValue] = stack[stack.length - 1] || -Infinity;
    if (num < maxValue && num > minValue) {
      return true;
    }
    stack.push([num, currMin]);
    currMin = Math.min(num, currMin);
  }
  return false;
};
