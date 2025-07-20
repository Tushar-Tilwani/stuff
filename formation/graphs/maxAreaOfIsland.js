/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let result = 0;
  const MAX_ROWS = grid.length;
  const MAX_COLS = grid[0].length;
  const visited = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(false));
  for (let i = 0; i < MAX_ROWS; i++) {
    for (let j = 0; j < MAX_COLS; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        visited[i][j] = true;
        result = Math.max(bfs(grid, i, j, visited), result);
      }
    }
  }
  return result;
};

function bfs(grid, srcI, srcJ, visited) {
  let area = 0;
  const QUEUE = [[srcI, srcJ]];
  while (QUEUE.length) {
    const [currI, currJ] = QUEUE.shift();
    const neighbors = getNeighbors(grid, currI, currJ);
    area++;
    for ([nI, nJ] of neighbors) {
      if (visited[nI][nJ]) {
        continue;
      }
      visited[nI][nJ] = true;

      QUEUE.push([nI, nJ]);
    }
  }

  return area;
}

function getNeighbors(grid, i, j) {
  const result = [];
  const MAX_ROWS = grid.length;
  const MAX_COLS = grid[0].length;

  i + 1 < MAX_ROWS && grid[i + 1][j] === 1 && result.push([i + 1, j]);
  i - 1 >= 0 && grid[i - 1][j] === 1 && result.push([i - 1, j]);
  j + 1 < MAX_COLS && grid[i][j + 1] === 1 && result.push([i, j + 1]);
  j - 1 >= 0 && grid[i][j - 1] === 1 && result.push([i, j - 1]);

  return result;
}
