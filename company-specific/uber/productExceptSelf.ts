function productExceptSelf(nums: number[]): number[] {
  const left: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    left[i] = nums[i] * (left[i - 1] ?? 1);
  }
  const right: number[] = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    right[i] = nums[i] * (right[i + 1] ?? 1);
  }

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    result[i] = (left[i - 1] ?? 1) * (right[i + 1] ?? 1);
  }
  console.log(left, right);

  return nums;
}
