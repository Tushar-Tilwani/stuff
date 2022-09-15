/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let result = -1;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        result = Math.max(result, bfs(i, j, grid));
      }
      if (grid[i][j] === 0) {
        result = Math.max(result, 0);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }

  return result;
};

function bfs(i, j, grid) {
  const QUEUE = [[i, j]];
  let result = -1;
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = QUEUE.shift();
      const neighbors = getNeighbors(grid, row, col);
      QUEUE.push(...neighbors);
      grid[row][col] = 2;
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
