// CYCLE SORT
// YOU DID NOT GET THIS FIRST TIME
// Assume the ideal input to be [1,2,3,..,n]
// Ignore len+1 and negative integers
// FIrst deviation will be the number
// If all in place then len+1 will be the answer
// Check this: https://uplevel.interviewkickstart.com/resource/rc-video-367728-1166707-247-1559
// 5:15


/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = function (nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + 1) {
      const d = nums[i] - 1;
      if (!(d >= 0 && d < len && nums[i] !== nums[d])) {
        break;
      }
      //   [nums[i], nums[d]] = [nums[d], nums[i]]
      swap(nums, i, d);
    }
  }

  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return len + 1;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
