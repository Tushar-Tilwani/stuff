/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  // Find the Pivot where array rotates
  let start = 0;
  let end = nums.length - 1;
  const lastVal = nums[end];
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];

    if (midVal <= lastVal) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  const pivotIndex = start;

  if (target <= lastVal) {
    // value in right half
    start = pivotIndex;
    end = nums.length - 1;
  } else {
    start = 0;
    end = pivotIndex - 1;
  }

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];

    if (midVal === target) {
      return mid;
    }

    if (target < midVal) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};
