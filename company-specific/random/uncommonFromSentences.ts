function uncommonFromSentences(s1: string, s2: string): string[] {
  const wordFreqMap = [...s1.split(" "), ...s2.split(" ")].reduce(
    (acc, word) => {
      acc.set(word, (acc.get(word) ?? 0) + 1);
      return acc;
    },
    new Map<string, number>()
  );
  return Array.from(wordFreqMap.entries())
    .filter(([word, freq]) => freq === 1)
    .map(([word]) => word);
}
