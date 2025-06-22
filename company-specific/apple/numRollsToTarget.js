/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  const TABLE = new Array(n + 1)
    .fill()
    .map(() => new Array(target + 1).fill(0));

  for (let i = 1; i <= k; i++) {
    TABLE[1][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      let numOfWays = 0;
      for (let l = 1; l <= Math.min(k, j); l++) {
        numOfWays += TABLE[i - 1][j - l] * TABLE[i - 1][l];
      }
      TABLE[i][j] = numOfWays;
    }
  }

  console.log(TABLE);
};
