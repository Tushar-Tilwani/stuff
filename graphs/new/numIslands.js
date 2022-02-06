/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  const maxRows = grid.length;
  const maxCols = grid[0].length;
  const visited = new Array(maxRows)
    .fill()
    .map(() => new Array(maxCols).fill(false));
  let components = 0;

  for (let i = 0; i < maxRows; i++) {
    for (let j = 0; j < maxCols; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        visited[i][j] = true;
        dfs(grid, i, j, visited);
        components += 1;
      }
    }
  }
  return components;
}

function dfs(grid, i, j, visited) {
  for (const [x, y] of getNeighbours(grid, i, j)) {
    if (visited[x][y]) {
      continue;
    }
    visited[x][y] = true;
    dfs(grid, x, y, visited);
  }
}

function getNeighbours(grid, i, j) {
  const result = [];
  if (grid[i - 1] && grid[i - 1][j] === "1") {
    result.push([i - 1, j]);
  }

  if (grid[i] && grid[i][j - 1] === "1") {
    result.push([i, j - 1]);
  }

  if (grid[i + 1] && grid[i + 1][j] === "1") {
    result.push([i + 1, j]);
  }

  if (grid[i] && grid[i][j + 1] === "1") {
    result.push([i, j + 1]);
  }

  return result;
}

let grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];

console.log(numIslands(grid));
