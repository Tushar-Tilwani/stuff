// https://uplevel.interviewkickstart.com/resource/rc-video-367728-1166707-247-1559
// 2:35
/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = function (nums) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    while (nums[i] !== i) {
      const val = nums[i];
      if (val >= len) {
        break;
      }
      swap(nums, i, val);
    }
  }
  for (let i = 0; i < len; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
  return len;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

// console.log(missingNumber([2, 0, 1, 3, 4, 5, 6, 8]));
