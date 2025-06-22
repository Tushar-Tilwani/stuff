function bfs(start, grid, visited) {
  const QUEUE = [start];
  while (QUEUE.length > 0) {
    const [row, col] = QUEUE.shift();
    visited[row][col] = true;
    grid[row][col] = "0";
    const neighbors = getNeighbors(grid, visited, row, col);
    for (const [nRow, nCol] of neighbors) {
      if (!visited[nRow][nCol]) {
        QUEUE.push([nRow, nCol]);
      }
    }
  }
  return visited;
}

function getVisited(grid) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const visited = [];

  for (let i = 0; i < MAX_ROW; i++) {
    visited[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      visited[i][j] = false;
    }
  }

  return visited;
}

function getNeighbors(grid, visited, i, j) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const result = [];

  if (i - 1 >= 0 && grid[i - 1][j] === "1" && !visited[i - 1][j]) {
    result.push([i - 1, j]);
  }

  if (i + 1 < MAX_ROW && grid[i + 1][j] === "1" && !visited[i + 1][j]) {
    result.push([i + 1, j]);
  }

  if (j - 1 >= 0 && grid[i][j - 1] === "1" && !visited[i][j - 1]) {
    result.push([i, j - 1]);
  }

  if (j + 1 < MAX_COL && grid[i][j + 1] === "1" && !visited[i][j + 1]) {
    result.push([i, j + 1]);
  }

  return result;
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if (grid.length === 0) {
    return 0;
  }
  const visited = getVisited(grid);
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  let connectedComponents = 0;

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        bfs([i, j], grid, visited);
        connectedComponents += 1;
      }
    }
  }

  return connectedComponents;
};

let grid = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];

console.log(numIslands(grid));
