function findLengthOfLCIS(nums: number[]): number {
  let left = -1;
  let result = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] < nums[right + 1]) {
      result = Math.max(result, right - left + 1);
    } else {
      left = right;
    }
  }
  return result;
}
