/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const isMajorityElement = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (target <= nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  const leftIndex = start;
  const expectedRightIndex = leftIndex + Math.floor(nums.length / 2);

  return nums[expectedRightIndex] === target;
};
