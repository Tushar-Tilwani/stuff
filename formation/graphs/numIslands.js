/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let components = 0;
  const MAX_ROWS = grid.length;
  const MAX_COLS = grid[0].length;
  const visited = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(false));
  for (let i = 0; i < MAX_ROWS; i++) {
    for (let j = 0; j < MAX_COLS; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        components++;
        visited[i][j] = true;
        bfs(grid, i, j, visited);
      }
    }
  }
  return components;
};

function getNeighbors(grid, i, j) {
  const result = [];
  const MAX_ROWS = grid.length;
  const MAX_COLS = grid[0].length;

  i + 1 < MAX_ROWS && grid[i + 1][j] === "1" && result.push([i + 1, j]);
  i - 1 >= 0 && grid[i - 1][j] === "1" && result.push([i - 1, j]);
  j + 1 < MAX_COLS && grid[i][j + 1] === "1" && result.push([i, j + 1]);
  j - 1 >= 0 && grid[i][j - 1] === "1" && result.push([i, j - 1]);

  return result;
}

function bfs(grid, srcI, srcJ, visited) {
  const QUEUE = [[srcI, srcJ]];
  while (QUEUE.length) {
    const [currI, currJ] = QUEUE.shift();
    const neighbors = getNeighbors(grid, currI, currJ);

    for ([nI, nJ] of neighbors) {
      if (visited[nI][nJ]) {
        continue;
      }
      visited[nI][nJ] = true;
      QUEUE.push([nI, nJ]);
    }
  }
}

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log("numIslands", numIslands(grid));
