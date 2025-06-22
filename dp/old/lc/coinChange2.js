// https://leetcode.com/problems/coin-change-2/

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const sortedCoins = coins.sort((a, b) => a - b);
  const DP = [[1]];
  for (let i = 1; i <= amount; i++) {
    DP[0][i] = 0;
  }
  for (let i = 1; i <= sortedCoins.length; i++) {
    DP[i] = [1];
  }
  let rowIndex = 1;
  for (const coin of sortedCoins) {
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
      let val = 0;
      val += DP[rowIndex - 1][currentAmount];
      if (currentAmount - coin >= 0) {
        val += DP[rowIndex][currentAmount - coin];
      }
      DP[rowIndex][currentAmount] = val;
    }
    rowIndex++;
  }

  console.log(DP);
  return DP[rowIndex - 1][amount];
};
