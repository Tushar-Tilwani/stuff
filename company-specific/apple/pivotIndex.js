/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  let runningSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const sumLeft = (sum - nums[i]) / 2;
    if (runningSum === sumLeft) {
      return i;
    }
    runningSum += nums[i];
  }
  return -1;
};
