/**
 * @param {number[]} nums
 * @return {number}
 */
 const findMin = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  const firstVal = nums[0];

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];

    if (midVal < firstVal) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  // edge case fully sorted array
  start = start === nums.length ? 0 : start;
  return nums[start];
};