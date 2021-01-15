/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let result = -Infinity;
  const visited = new Array(grid.length)
    .fill([])
    .map(() => new Array(grid[0].length).fill(false));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (visited[i][j] === false && grid[i][j] === 1) {
        result = Math.max(result, bfs(grid, i, j, visited));
      }
    }
  }

  return result;
};

function bfs(grid, startI, startJ, visited) {
  let result = 0;
  visited[startI][startJ] = true;
  const QUEUE = [[startI, startJ]];
  while (QUEUE.length) {
    const [i, j] = QUEUE.shift();
    for (const [nI, nJ] of getNeighbors(grid, i, j)) {
      if (!visited[nI][nJ]) {
        QUEUE.push([nI, nJ]);
        visited[nI][nJ] = true;
      }
    }
    result++;
  }
  return result;
}

function getNeighbors(grid, i, j) {
  const result = [];
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  if (i + 1 < MAX_ROW && grid[i + 1][j] === 1) {
    result.push([i + 1, j]);
  }

  if (i - 1 >= 0 && grid[i - 1][j] === 1) {
    result.push([i - 1, j]);
  }

  if (j + 1 < MAX_COL && grid[i][j + 1] === 1) {
    result.push([i, j + 1]);
  }

  if (j - 1 >= 0 && grid[i][j - 1] === 1) {
    result.push([i, j - 1]);
  }
  return result;
}

const grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

const grid1 = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
];

console.log(maxAreaOfIsland(grid1));
