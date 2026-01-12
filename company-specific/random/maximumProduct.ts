function maximumProduct(nums: number[]): number {
  const [neg1, neg2] = nums.filter((num) => num < 0).sort((a, b) => a - b);
  const [pos1, pos2, pos3] = nums.filter((num) => num > 0).sort((a, b) => b - a);
  const [val1, val2, val3] = nums.sort((a, b) => b - a);
  return Math.max(neg1 * neg2 * pos1 || -Infinity, pos1 * pos2 * pos3 || -Infinity, val1 * val2 * val3);
}
