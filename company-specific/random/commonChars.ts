function commonChars(words: string[]): string[] {
  const charMap = new Map<string, Map<number, number>>();
  for (let i = 0; i < words.length; i++) {
    const chars = words[i].split("");
    for (const char of chars) {
      const indexMap = charMap.get(char) ?? new Map<number, number>();
      indexMap.set(i, (indexMap.get(i) ?? 0) + 1);
      charMap.set(char, indexMap);
    }
  }

  const resultEntries = Array.from(charMap.entries())
    .filter(([, count]) => count.size === words.length)
    .map(([char, count]) => {
      const minCount = Math.min(...Array.from(count.values()));
      return [char, minCount];
    })
    .reduce((acc, [char, count]) => {
      acc.push(...new Array(count).fill(char));
      return acc;
    }, []);
  console.log("resultEntries", resultEntries);
  return resultEntries as string[];
}
