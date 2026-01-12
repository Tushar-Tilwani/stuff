function shuffle(nums: number[], n: number): number[] {
  const result = [];
  let i = 0;
  while (i < n) {
    result.push(nums[i]);
    result.push(nums[i + n]);
    i++;
  }
  return result;
}
