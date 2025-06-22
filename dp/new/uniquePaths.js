/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  const TABLE = [];

  TABLE[0] = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    TABLE[i] = [];
    TABLE[i][0] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      TABLE[i][j] = TABLE[i - 1][j] + TABLE[i][j - 1];
    }
  }

  return TABLE[m - 1][n - 1];
}
