function subarraySum(nums: number[], k: number): number {
  const sumMap = new Map<number, number>([[0, 1]]);
  let sum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sumMap.has(sum - k)) {
      count += sumMap.get(sum - k)!;
    }
    sumMap.set(sum, (sumMap.get(sum) ?? 0) + 1);
  }
  return count;
}
