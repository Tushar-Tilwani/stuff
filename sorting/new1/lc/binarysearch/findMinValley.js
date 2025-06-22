/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  const lastVal = nums[end];

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = nums[mid];
    const prevMidVal = nums[mid - 1] ?? Infinity;
    const nextMidVal = nums[mid + 1] ?? Infinity;

    if (midVal < prevMidVal && midVal < nextMidVal) {
      return midVal;
    }

    if (midVal <= lastVal) {
      end = mid - 1;
    } else {
      // midVal > lastVal
      start = mid + 1;
    }
  }

  return null;
};
