/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let lastValid = 0;
  let pointer = 1;
  let prevVal = nums[0];

  while (pointer < nums.length) {
    if (nums[pointer] !== prevVal) {
      lastValid += 1;
      swap(nums, pointer, lastValid);
      prevVal = nums[lastValid];
    }
    pointer++;
  }

  return lastValid + 1;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(removeDuplicates([0, 0, 0, 1, 1, 1, 2, 2, 3]));
