/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  const TABLE = [0];
  for (let i = 1; i <= amount; i++) {
    TABLE[i] = Infinity;
    for (const coin of coins) {
      if (i - coin >= 0) {
        // i-coin === 0 means i === coing. By virtue of Table[0] = 0 it will be 1
        TABLE[i] = Math.min(TABLE[i], TABLE[i - coin]);
      }
    }
    TABLE[i] += 1;
  }

  return !isFinite(TABLE[amount]) ? -1 : TABLE[amount];
}
