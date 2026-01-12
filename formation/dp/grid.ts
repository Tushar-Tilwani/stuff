function minPathSum(grid: number[][]): number {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  if (ROWS === 0 || COLS === 0) {
    return 0;
  }
  const TABLE = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));
  TABLE[0][0] = grid[0][0];
  for (let i = 1; i < ROWS; i++) {
    TABLE[i][0] = grid[i][0] + TABLE[i - 1][0];
  }
  for (let j = 1; j < COLS; j++) {
    TABLE[0][j] = grid[0][j] + TABLE[0][j - 1];
  }

  for (let i = 1; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      TABLE[i][j] = Math.min(TABLE[i - 1][j], TABLE[i][j - 1]) + grid[i][j];
    }
  }

  return TABLE[ROWS - 1][COLS - 1];
}
