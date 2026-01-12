/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  let pivot = -1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i - 1] < nums[i]) {
      pivot = i - 1;
      break;
    }
  }
  if (pivot === -1) {
    nums.sort((a, b) => a - b);
    return;
  }
  const pivotVal = nums[pivot];
  nums[pivot] = nums[pivot + 1];
  nums[pivot + 1] = pivotVal;
}
