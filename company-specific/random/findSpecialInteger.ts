function findSpecialInteger(arr: number[]): number {
  const freqMap = arr.reduce((acc, val) => {
    acc.set(val, (acc.get(val) ?? 0) + 1);
    return acc;
  }, new Map<number, number>());
  const entries = Array.from(freqMap.entries());
  for (const [val, freq] of entries) {
    if (freq >= 0.25 * arr.length) {
      return val;
    }
  }
  return -1;
}
