function canConstruct(s: string, k: number): boolean {
  if (s.length < k) {
    return false;
  }
  if (s.length === k) {
    return true;
  }
  const freqMap = s.split("").reduce((acc, char) => {
    acc.set(char, (acc.get(char) ?? 0) + 1);
    return acc;
  }, new Map());

  const values = Array.from(freqMap.values());

  const odds = values.filter((a) => a % 2 == 1);
  const evens = values.filter((a) => a % 2 == 0);

  if (odds.length > k) {
    return false;
  }

  return true;
}
