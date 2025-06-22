// https://leetcode.com/problems/unique-paths/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  const DP_TABLE = [];
  for (let i = 0; i < n; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < m; j++) {
      DP_TABLE[i][j] = 0;
    }
  }

  for (let i = 0; i < n; i++) {
    DP_TABLE[i][0] = 1;
  }

  for (let j = 0; j < m; j++) {
    DP_TABLE[0][j] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      DP_TABLE[i][j] = DP_TABLE[i - 1][j] + DP_TABLE[i][j - 1];
    }
  }

  return DP_TABLE[n - 1][m - 1];
};

console.log(uniquePaths(5, 5));
