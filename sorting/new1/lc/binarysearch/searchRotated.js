/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  const lastVal = nums[end];
  const isTargetInRightZone = target <= lastVal;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];
    const isMidInRightZone = midVal <= lastVal;
    if (midVal === target) {
      return mid;
    }
    if (isTargetInRightZone && !isMidInRightZone) {
      // move right
      start = mid + 1;
      continue;
    }

    if (!isTargetInRightZone && isMidInRightZone) {
      // move left as target is in left zone
      end = mid - 1;
      continue;
    }

    // target and mid both in right zone lets normal binary search
    if (target < midVal) {
      end = mid - 1;
      continue;
    }
    start = mid + 1;
  }

  return -1;
};
