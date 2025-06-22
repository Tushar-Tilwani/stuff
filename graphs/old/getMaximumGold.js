/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function(grid) {
  const result = [0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const visited = {};
      dfs(i, j, 0, grid, visited, result);
    }
  }

  return result[0];
};

function dfs(i, j, sum, grid, visited, result) {
  const neighbors = getNeighbors(i, j, grid);

  if (grid[i][j] === 0 || visited[`${i}${j}`]) {
    result[0] = Math.max(sum, result[0]);
    return;
  }
  const updatedSum = sum + grid[i][j];
  visited[`${i}${j}`] = true;

  for (const [nI, nJ] of neighbors) {
    dfs(nI, nJ, updatedSum, grid, visited, result);
  }

  visited[`${i}${j}`] = false;
}

function getNeighbors(i, j, grid) {
  const maxRows = grid.length;
  const maxCols = grid[0].length;
  const neighbors = [];
  if (grid[i][j] === 0) {
    return [];
  }

  if (i - 1 >= 0) {
    neighbors.push([i - 1, j]);
  }

  if (i + 1 < maxRows) {
    neighbors.push([i + 1, j]);
  }

  if (j - 1 >= 0) {
    neighbors.push([i, j - 1]);
  }

  if (j + 1 < maxCols) {
    neighbors.push([i, j + 1]);
  }
  return neighbors;
}

console.log(
  getMaximumGold([
    [5, 3, 36, 26, 27],
    [11, 31, 23, 30, 4],
    [5, 7, 21, 38, 10],
    [39, 30, 10, 17, 13],
    [16, 0, 0, 26, 1],
    [25, 0, 10, 0, 0]
  ])
);
