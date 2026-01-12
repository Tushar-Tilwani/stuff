function swap(arr: unknown[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  let left = -1;
  let middle = 0;
  let right = nums.length;
  while (middle < right && left < middle) {
    if (nums[middle] === 0) {
      left++;
      swap(nums, left, middle);
      middle++;
    } else if (nums[middle] === 2) {
      right--;
      swap(nums, right, middle);
    } else {
      middle++;
    }
  }
}
