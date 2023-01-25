const sum = (acc, val) => acc + val;
const MOD = 10 ** 9 + 7;
/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
var dieSimulator = function (n, rollMax) {
  const TABLE = new Array(n + 1).fill().map(() => new Array(6).fill(0));

  for (let i = 0; i < 6; i++) {
    TABLE[1][i] = 1;
  }
  const SUMS = [1, 6];
  for (let i = 2; i <= n; i++) {
    SUMS[i - 1] = TABLE[i - 1].reduce(sum);
    for (let num = 0; num < 6; num++) {
      for (let k = 1; k <= Math.min(rollMax[num], i); k++) {
        TABLE[i][num] += (SUMS[i - k] - TABLE[i - k][num]) % MOD;
      }
    }
  }

  //   console.log(TABLE);

  return TABLE[n].reduce(sum) % MOD;
};
