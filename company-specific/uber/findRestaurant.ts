function findRestaurant(list1: string[], list2: string[]): string[] {
  const list2Map = list2.reduce((acc, str, i) => {
    acc.set(str, i);
    return acc;
  }, new Map<string, number>());
  const common = new Map();
  for (let i = 0; i < list1.length; i++) {
    const word = list1[i];
    if (list2Map.has(word)) {
      const sum = i + list2Map.get(word);
      const words = common.get(sum) ?? [];
      words.push(word);
      common.set(sum, words);
    }
  }
  const keys = Array.from(common.keys()).sort((a, b) => a - b);
  console.log(common);

  return common.get(keys[0]) ?? [];
}
