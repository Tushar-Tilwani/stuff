/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    if (nums[start] !== nums[end]) {
      break;
    }

    start++;
  }

  const lastval = nums[end];
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];
    if (midVal > lastval) {
      start = mid + 1;
    } else {
      // midVal <= lastVal
      end = mid - 1;
    }
  }

  return nums[start];
};
