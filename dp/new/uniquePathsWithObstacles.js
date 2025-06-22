/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const TABLE = [];
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  let foundBlock = false;
  for (let i = 0; i < m; i++) {
    TABLE[i] = [];
    if (foundBlock || obstacleGrid[i][0] === 1) {
      foundBlock = true;
      TABLE[i][0] = 0;
      continue;
    }
    TABLE[i][0] = 1;
  }

  foundBlock = false;

  for (let j = 0; j < n; j++) {
    if (foundBlock || obstacleGrid[0][j] === 1) {
      foundBlock = true;
      TABLE[0][j] = 0;
      continue;
    }
    TABLE[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        TABLE[i][j] = 0;
      } else {
        TABLE[i][j] = TABLE[i][j - 1] + TABLE[i - 1][j];
      }
    }
  }

  return TABLE[m - 1][n - 1];
}
