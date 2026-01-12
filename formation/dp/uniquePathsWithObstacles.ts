function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const ROWS = obstacleGrid.length;
  const COLS = obstacleGrid[0].length;
  const TABLE = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(0));
  TABLE[0][0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  for (let i = 1; i < ROWS; i++) {
    TABLE[i][0] = obstacleGrid[i][0] === 0 ? 1 : 0;
  }

  for (let j = 1; j < COLS; j++) {
    TABLE[0][j] = obstacleGrid[0][j] === 0 ? 1 : 0;
  }
  for (let i = 1; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      if (obstacleGrid[i][j] !== 0) {
        TABLE[i][j] = 0;
        continue;
      }
      TABLE[i][j] = TABLE[i][j - 1] + TABLE[i - 1][j];
    }
  }

  return TABLE[ROWS - 1][COLS - 1];
}
