function coinChange(coins: number[], amount: number): number {
  const len = coins.length;
  const TABLE = new Array(amount).fill(Infinity);
  TABLE[0] = 1;
  for (const coin of coins) {
    TABLE[coin] = 1;
  }

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin > 0) {
        TABLE[i] = Math.min(TABLE[i - coin], TABLE[i]) + 1;
      }
    }
  }

  return isFinite(TABLE[amount]) ? TABLE[amount] : -1;
}
