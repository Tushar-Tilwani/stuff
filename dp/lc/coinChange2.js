/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const DP = [1];
  for (let i = 1; i <= amount; i++) {
    DP[i] = 0;
    for (const coin of coins) {
      DP[i] += DP[i - coin] || 0;
    }
  }
  return DP;
};

const amount = 5,
  coins = [1, 2, 5];

console.log(change(amount, coins));
