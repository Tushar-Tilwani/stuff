/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const DP_TABLE = [];
  for (let i = 0; i <= amount; i++) {
    DP_TABLE[i] = Infinity;
  }
  DP_TABLE[0] = 0;

  for (const coin of coins) {
    DP_TABLE[coin] = 1;
  }

  for (let i = 1; i <= amount; i++) {
    DP_TABLE[i] = Math.min(DP_TABLE[i]);
    for (const coin of coins) {
      DP_TABLE[coin] = 1;
    }
  }
};
