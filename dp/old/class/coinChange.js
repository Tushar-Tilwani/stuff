/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const TABLE = [0];
  const coinSet = new Set(coins);

  for (let i = 1; i <= amount; i++) {
    if (!coinSet.has(i)) {
      TABLE[i] = Infinity;
      for (const coin of coins) {
        TABLE[i] = Math.min(TABLE[i - coin] + 1 || Infinity, TABLE[i]);
      }
    } else {
      TABLE[i] = 1;
    }
  }

  return isFinite(TABLE[amount]) ? TABLE[amount] : -1;
};

console.log(coinChange([1, 2147483644], 2));
