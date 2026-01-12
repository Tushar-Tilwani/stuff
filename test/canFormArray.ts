function canFormArray(arr: number[], pieces: number[][]): boolean {
  const arrIndexMap = arr.reduce((acc, val, index) => {
    acc.set(val, index);
    return acc;
  }, new Map());
  for (const piece of pieces) {
    let lastIndex = null;
    for (const val of piece) {
      if (!arrIndexMap.has(val)) {
        return false;
      }
      const currIndex = arrIndexMap.get(val);
      if (lastIndex !== null && lastIndex !== currIndex - 1) {
        return false;
      }
      lastIndex = currIndex;
    }
  }

  return true;
}
