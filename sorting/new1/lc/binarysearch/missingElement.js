// Could not solve first time
// check this: https://uplevel.interviewkickstart.com/resource/library-video-884

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const missingElement = function (nums, k) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const missingValues = nums[mid] - (mid + nums[0]);
    if (k <= missingValues) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  const missingValues = nums[end] - (end + nums[0]);
  const missingValuesLeft = k - missingValues;
  return nums[end] + missingValuesLeft;
};
