/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function (grid) {
  const visited = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(false));
  const result = [0];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== 0) {
        visited[row][col] = true;
        dfs(grid, row, col, visited, grid[row][col], result);
        visited[row][col] = false;
      }
    }
  }

  return result[0];
};

function dfs(grid, row, col, visited, currentVal, result) {
  const neighbors = getNeighbors(grid, row, col, visited);
  if (neighbors.length === 0) {
    result[0] = Math.max(result, currentVal);
    return;
  }
  for (const [nRow, nCol] of neighbors) {
    visited[nRow][nCol] = true;
    dfs(grid, nRow, nCol, visited, currentVal + grid[nRow][nCol], result);
    visited[nRow][nCol] = false;
  }
}

function getNeighbors(grid, row, col, visited) {
  const result = [];

  if (row - 1 >= 0 && !visited[row - 1][col] && grid[row - 1][col] !== 0) {
    result.push([row - 1, col]);
  }

  if (
    row + 1 < grid.length &&
    !visited[row + 1][col] &&
    grid[row + 1][col] !== 0
  ) {
    result.push([row + 1, col]);
  }

  if (col - 1 >= 0 && !visited[row][col - 1] && grid[row][col - 1] !== 0) {
    result.push([row, col - 1]);
  }

  if (
    col + 1 < grid[0].length &&
    !visited[row][col + 1] &&
    grid[row][col + 1] !== 0
  ) {
    result.push([row, col + 1]);
  }

  return result;
}
