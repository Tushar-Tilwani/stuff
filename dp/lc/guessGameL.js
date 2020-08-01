// https://leetcode.com/problems/guess-number-higher-or-lower-ii/submissions/

/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function(n) {
  const DP_TABLE = [];
  for (let i = 0; i <= n; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j <= n; j++) {
      DP_TABLE[i][j] = Infinity;
    }
  }

  for (let start = n; start >= 1; start--) {
    for (let end = start; end <= n; end++) {
      if (end < start) {
        continue;
      }

      if (start === end) {
        DP_TABLE[start][end] = 0;
        continue;
      }

      if (end - start === 1) {
        DP_TABLE[start][end] = start;
        continue;
      }

      if (end - start === 2) {
        const mid = Math.floor((start + end) / 2);
        DP_TABLE[start][end] = mid;
        continue;
      }

      for (let k = start + 1; k < end; k++) {
        DP_TABLE[start][end] = Math.min(
          DP_TABLE[start][end],
          k + Math.max(DP_TABLE[start][k - 1], DP_TABLE[k + 1][end])
        );
      }
    }
  }

  return DP_TABLE[1][n];
};

console.log(getMoneyAmount(7));
