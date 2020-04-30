function scoreCombinations(target) {
  const combs = [2, 3, 7];
  const TABLE = [0, 0];
  for (let i = 2; i <= target; i++) {
    TABLE[i] = 0;
    for (const comb of combs) {
      if (i - comb > 0) {
        TABLE[i] += TABLE[i - comb];
      }
      if (i - comb === 0) {
        TABLE[i] += 1;
      }
    }
  }
  console.log(TABLE);
  return TABLE[target];
}

console.log(scoreCombinations(12));
