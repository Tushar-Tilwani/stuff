/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = function (nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];
    const prevMidVal = nums[mid - 1] || -Infinity;
    const nextMidVal = nums[mid + 1] || -Infinity;

    if (midVal > nextMidVal && midVal > prevMidVal) {
      return mid;
    }
    if (midVal > prevMidVal) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
};
