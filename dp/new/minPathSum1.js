/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  const TABLE = new Array(MAX_ROW)
    .fill()
    .map(() => new Array(MAX_COL).fill(Infinity));

  TABLE[0][0] = grid[0][0];

  for (let i = 1; i < MAX_ROW; i++) {
    TABLE[i][0] = TABLE[i - 1][0] + grid[i][0];
  }

  for (let j = 1; j < MAX_COL; j++) {
    TABLE[0][j] = TABLE[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < MAX_ROW; i++) {
    for (let j = 1; j < MAX_COL; j++) {
      TABLE[i][j] = Math.min(TABLE[i - 1][j], TABLE[i][j - 1]) + grid[i][j];
    }
  }

  return TABLE[MAX_ROW - 1][MAX_COL - 1];
};
