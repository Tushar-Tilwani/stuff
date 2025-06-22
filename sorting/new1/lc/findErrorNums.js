/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findErrorNums = function (nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    while (nums[i] !== i + 1) {
      const d = nums[i] - 1;
      if (nums[i] === nums[d]) {
        // If number already then don't sawp as that would lead to infinite loop
        break;
      }
      swap(nums, i, d);
    }
  }

  const result = [];
  for (let i = 0; i < len; i++) {
    if (i + 1 !== nums[i]) {
      result.push(nums[i], i + 1);
    }
  }
  return result;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
