function maxNumberOfApples(weight: number[]): number {
  const sortedWeight = weight.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < sortedWeight.length; i++) {
    sum += sortedWeight[i];
    if (sum > 5000) {
      return i;
    }
  }
  return sortedWeight.length;
}
