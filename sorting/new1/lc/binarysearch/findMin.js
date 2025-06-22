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

    if (midVal > lastVal) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return nums[start];
};


