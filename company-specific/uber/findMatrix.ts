function findMatrix(nums: number[]): number[][] {
  const result: number[][] = [];
  const frequencyMap = nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) ?? 0) + 1);
    return acc;
  }, new Map<number, number>());

  while (frequencyMap.size > 0) {
    const row = Array.from(frequencyMap.keys());
    result.push(row);
    for (const key of row) {
      const freq = frequencyMap.get(key) as number;
      if (freq === 1) {
        frequencyMap.delete(key);
      } else {
        frequencyMap.set(key, freq - 1);
      }
    }
  }
  return result;
}
