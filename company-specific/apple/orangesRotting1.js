/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let result = -1;
  const QUEUE = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        QUEUE.push([i, j]);
      }
    }
  }

  result = Math.max(result, bfs(grid, QUEUE));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
      if (grid[i][j] === 0) {
        result = Math.max(result, 0);
      }
    }
  }

  return result;
};

function bfs(grid, QUEUE) {
  let result = -1;
  while (QUEUE.length > 0) {
    // console.log(QUEUE)
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = QUEUE.shift();
      const neighbors = getNeighbors(grid, row, col);
      for (const [nRow, nCol] of neighbors) {
        grid[nRow][nCol] = 2;
      }
      QUEUE.push(...neighbors);
    }
    result++;
  }
  return result;
}

function getNeighbors(grid, row, col) {
  const neighbors = [];

  row + 1 < grid.length &&
    grid[row + 1][col] === 1 &&
    neighbors.push([row + 1, col]);

  row - 1 >= 0 && grid[row - 1][col] === 1 && neighbors.push([row - 1, col]);

  col + 1 < grid[0].length &&
    grid[row][col + 1] === 1 &&
    neighbors.push([row, col + 1]);

  col - 1 >= 0 && grid[row][col - 1] === 1 && neighbors.push([row, col - 1]);

  return neighbors;
}
