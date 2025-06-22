/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  return [bSearchLeft(nums, target), bSearchRight(nums, target)];
};

function bSearchLeft(nums, target, start = 0, end = nums.length - 1) {
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] === target) {
      if (nums[mid - 1] !== target) {
        return mid;
      }
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else if (nums[mid] > target) {
      end = mid - 1;
    }
  }

  return -1;
}

function bSearchRight(nums, target, start = 0, end = nums.length - 1) {
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] === target) {
      if (nums[mid + 1] !== target) {
        return mid;
      }
      start = mid + 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else if (nums[mid] > target) {
      end = mid - 1;
    }
  }

  return -1;
}
