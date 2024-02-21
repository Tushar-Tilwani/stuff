/***

The pairs which are on the left of the single element, 
will have the first element in an even position and 
the second element at an odd position. 
All the pairs which are on the right side of the single 
element will have the first position at an odd position 
and the second element at an even position. 
Use this fact to decide whether to go to the left side of 
the array or the right side.

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNonDuplicate = function (nums) {
  if (nums.length % 2 === 0) {
    return -1;
  }

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] !== nums[mid + 1] && nums[mid] !== nums[mid - 1]) {
      return nums[mid];
    }
    const lowerPair = nums[mid] == nums[mid + 1] ? mid : mid - 1;
    if (lowerPair % 2 === 1) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};
