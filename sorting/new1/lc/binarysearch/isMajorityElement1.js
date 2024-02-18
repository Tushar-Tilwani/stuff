/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const isMajorityElement = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  const mid = Math.floor((end - start) / 2) + start;
  if (nums[mid] !== target) {
    return false;
  }

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (target <= nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  const leftIndex = start;

  start = 0;
  end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (target < nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  const rightIndex = end;

  const count = rightIndex - leftIndex + 1;

  //   console.log([leftIndex, rightIndex]);

  return count > Math.floor(nums.length / 2);
};
