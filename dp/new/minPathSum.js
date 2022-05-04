/**
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
  const TABLE = [];
  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i++) {
    TABLE[i] = new Array(n).fill(null);
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) {
        TABLE[i][j] = grid[i][j];
        continue;
      }
      if (i == 0) {
        TABLE[i][j] = grid[i][j] + TABLE[i][j - 1];
        continue;
      }
      if (j == 0) {
        TABLE[i][j] = grid[i][j] + TABLE[i - 1][j];
        continue;
      }
      TABLE[i][j] = grid[i][j] + Math.min(TABLE[i][j - 1], TABLE[i - 1][j]);
    }
  }

  return TABLE[m - 1][n - 1];
}
