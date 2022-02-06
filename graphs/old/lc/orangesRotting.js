/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const QUEUE = [];
  let totalGoodOranges = 0;
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  // Just start with autopopulated bfs.
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 2) {
        QUEUE.push([[i, j], 0]);
      } else if (grid[i][j] === 1) {
        totalGoodOranges += 1;
      }
    }
  }

  return bfs(QUEUE, totalGoodOranges, grid);
};

function bfs(QUEUE, totalGoodOranges, grid) {
  let result = 0;
  let totalInfectedOranges = 0;
  while (QUEUE.length > 0) {
    const [[row, col], depth] = QUEUE.shift();
    const neighbors = getNeighbors(grid, row, col);
    for (const [nRow, nCol] of neighbors) {
      totalInfectedOranges += 1;
      QUEUE.push([[nRow, nCol], depth + 1]);
      grid[nRow][nCol] = 2;
    }
    result = depth;
  }
  return totalInfectedOranges === totalGoodOranges ? result : -1;
}
function getNeighbors(grid, row, col) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const result = [];

  if (row - 1 >= 0 && grid[row - 1][col] === 1) {
    result.push([row - 1, col]);
  }

  if (row + 1 < MAX_ROW && grid[row + 1][col] === 1) {
    result.push([row + 1, col]);
  }

  if (col - 1 >= 0 && grid[row][col - 1] === 1) {
    result.push([row, col - 1]);
  }

  if (col + 1 < MAX_COL && grid[row][col + 1] === 1) {
    result.push([row, col + 1]);
  }

  return result;
}
