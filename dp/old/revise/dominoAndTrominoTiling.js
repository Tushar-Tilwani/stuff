// https://leetcode.com/problems/domino-and-tromino-tiling/
// https://youtu.be/jEROPE7rf6k?t=11133
/**
 * @param {number} N
 * @return {number}
 */
const MOD = Math.pow(10, 9) + 7;
var numTilings = function(N) {
  const DP_TABLE = [1, 1, 2];
  const L = [0, 0, 1];
  const U = [0, 0, 1];

  for (let i = 3; i <= N; i++) {
    DP_TABLE[i] = L[i - 1] + U[i - 1] + DP_TABLE[i - 2] + DP_TABLE[i - 1];
    L[i] = DP_TABLE[i - 2] + U[i - 1];
    U[i] = DP_TABLE[i - 2] + L[i - 1];

    DP_TABLE[i] = DP_TABLE[i] % MOD;
    L[i] = L[i] % MOD;
    U[i] = U[i] % MOD;
  }

  // console.log(DP_TABLE);

  return DP_TABLE[N];
};
