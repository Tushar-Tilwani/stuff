/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let nonZeroIndex = 0;
  // NOT AN EASY QUESTION. SORT OF LOMOTO PARTITIONING. AS ORDERING OF ZERO DOES NOT MATTER
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      swap(nums, i, nonZeroIndex);
      nonZeroIndex++;
    }
  }
  return nums;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(moveZeroes([0,1,0,2,0,3]));
