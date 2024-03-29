/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] === target) {
      return mid;
    }
    if (target < nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
};
