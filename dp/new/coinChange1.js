/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const TABLE = new Array(amount + 1).fill(Infinity);
  TABLE[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      TABLE[i] = Math.min(TABLE[i], TABLE[i - coin] ?? Infinity);
    }
    TABLE[i] += 1;
  }

  return isFinite(TABLE[amount]) ? TABLE[amount] : -1;
};
