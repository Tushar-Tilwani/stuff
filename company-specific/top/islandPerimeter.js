/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  const result = [0];
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const visited = new Array(MAX_ROW)
    .fill()
    .map(() => new Array(MAX_COL).fill(false));
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        visited[i][j] = true;
        dfs(grid, i, j, visited, result);
        break;
      }
    }
  }
  return result[0];
};

function dfs(grid, row, col, visited, result) {
  const neighbors = getNeighors(grid, row, col);
  result[0] += 4 - neighbors.length;
  for (const [nRow, nCol] of neighbors) {
    if (visited[nRow][nCol]) {
      continue;
    }
    visited[nRow][nCol] = true;
    dfs(grid, nRow, nCol, visited, result);
  }
  return result[0];
}

function getNeighors(grid, row, col) {
  const neighbors = [];
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  if (row - 1 >= 0 && grid[row - 1][col] === 1) {
    neighbors.push([row - 1, col]);
  }

  if (row + 1 < MAX_ROW && grid[row + 1][col] === 1) {
    neighbors.push([row + 1, col]);
  }

  if (col - 1 >= 0 && grid[row][col - 1] === 1) {
    neighbors.push([row, col - 1]);
  }

  if (col + 1 < MAX_COL && grid[row][col + 1] === 1) {
    neighbors.push([row, col + 1]);
  }

  return neighbors;
}

console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
  ])
);
