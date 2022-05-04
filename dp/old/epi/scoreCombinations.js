function scoreCombinations(target) {
  const combs = [2, 3, 7];
  const TABLE = [];

  for (let i = 0; i <= target; i++) {
    TABLE[i] = 0;
  }

  for (const comb of combs) {
    TABLE[comb] = 1;
  }

  for (let i = 2; i <= target; i++) {
    for (const comb of combs) {
      if (i - comb > 0) {
        TABLE[i] += TABLE[i - comb];
      }
    }
  }
  return TABLE[target];
}

console.log(scoreCombinations(12));
