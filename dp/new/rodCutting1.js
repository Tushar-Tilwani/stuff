function rodCutting(prices) {
  const len = prices.length;
  const TABLE = [prices[0]];
  for (let i = 1; i < len; i++) {
    TABLE[i] = prices[i];
    for (let cut = 0; cut <= i; cut++) {
      console.log(
        i,
        cut,
        TABLE[i - cut] + TABLE[cut],
        TABLE[i - cut] + prices[cut]
      );
      TABLE[i] = Math.max(TABLE[i], TABLE[i - cut] + TABLE[cut]);
    }
  }
  return TABLE[len - 1];
}

console.log(rodCutting([0, 1, 3, 3, 8, 9, 10]));
