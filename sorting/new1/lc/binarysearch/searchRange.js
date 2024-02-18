/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {
  const left = bSearchLeft(nums, target);
  if (left === -1) {
    return [-1, -1];
  }
  const right = bSearchRight(nums, target);

  return [left, right];
};

function bSearchRight(nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (target < nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return end;
}

function bSearchLeft(nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (target <= nums[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}
