/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  let leftMin = Infinity;
  for (let j = 0; j < nums.length; j++) {
    leftMin = Math.min(leftMin, nums[j]);
    for (let k = j + 1; k < nums.length; k++) {
      if (leftMin < nums[j] && nums[j] > nums[k] && leftMin < nums[k]) {
        return true;
      }
    }
  }
  return false;
};
