function dfs([row, col], grid) {
  grid[row][col] = "0";
  const neighbors = getNeighbors(grid, row, col);
  for (const [nRow, nCol] of neighbors) {
    if (grid[nRow][nCol] === "1") {
      dfs([nRow, nCol], grid);
    }
  }
  return grid;
}

function getNeighbors(grid, row, col) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const result = [];

  if (row - 1 >= 0 && grid[row - 1][col] === "1") {
    result.push([row - 1, col]);
  }

  if (row + 1 < MAX_ROW && grid[row + 1][col] === "1") {
    result.push([row + 1, col]);
  }

  if (col - 1 >= 0 && grid[row][col - 1] === "1") {
    result.push([row, col - 1]);
  }

  if (col + 1 < MAX_COL && grid[row][col + 1] === "1") {
    result.push([row, col + 1]);
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
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  let connectedComponents = 0;

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === "1") {
        dfs([i, j], grid);
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
  ["0", "0", "0", "0", "1"]
];

console.log(numIslands(grid));
