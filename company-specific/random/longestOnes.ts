function longestOnes(nums: number[], k: number): number {
  const indices = [];

  for (let i = 0; i < nums.length; i++) {}
  let left = 0;
  let right = 0;
  let temp = k;
  let result = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      if (temp >= 0) {
        temp--;
      }
      // temp = -1;
      while (temp === -1) {
        if (nums[left] === 0) {
          temp++;
        }
        left++;
      }
    }
    result = Math.max(result, right - left + 1);
    right++;
  }

  return result;
}
