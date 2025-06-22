/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  const MINS = [[nums[0], 0]];
  const MAXS = [[nums[0], 0]];

  for (let i = 1; i < nums.length; i++) {
    const [minVal] = MINS[i - 1];
    MINS[i] = nums[i] < minVal ? [nums[i], i] : MINS[i - 1];

    const [maxVal] = MAXS[i - 1];
    MAXS[i] = nums[i] > maxVal ? [nums[i], i] : MAXS[i - 1];
  }

  for (let i = 2; i < nums.length; i++) {
    const [minVal, minIndex] = MINS[i];
    const [maxVal, maxIndex] = MAXS[i];
    if (nums[i] > minVal && nums[i] < maxVal && i > minIndex && i > maxIndex) {
      return true;
    }
  }
  return false;
};
