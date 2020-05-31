/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
  const result = startTraversal(grid);
  return isOrangeLeft(grid) ? -1 : result;
};

function startTraversal(grid) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const result = [];
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 2) {
        result.push(
          bfs(
            [i, j],
            grid.map(row => row.slice(0))
          )
        );
      }
    }
  }
  const answer = Math.min(...result);
  // console.log(result);
  return isFinite(answer) ? answer : 0;
}

function isOrangeLeft(grid) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 1) {
        return true;
      }
    }
  }
  return false;
}

function bfs(start, grid) {
  const QUEUE = [[start, 0]];
  let result = 0;
  while (QUEUE.length > 0) {
    const [[row, col], depth] = QUEUE.shift();
    const neighbors = getNeighbors(grid, row, col);
    for (const [nRow, nCol] of neighbors) {
      QUEUE.push([[nRow, nCol], depth + 1]);
      grid[nRow][nCol] = 2;
    }
    result = depth;
  }
  return result || Infinity;
}
function getNeighbors(grid, row, col) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const result = [];

  if (row - 1 >= 0 && grid[row - 1][col] === 1) {
    result.push([row - 1, col]);
  }

  if (row + 1 < MAX_ROW && grid[row + 1][col] === 1) {
    result.push([row + 1, col]);
  }

  if (col - 1 >= 0 && grid[row][col - 1] === 1) {
    result.push([row, col - 1]);
  }

  if (col + 1 < MAX_COL && grid[row][col + 1] === 1) {
    result.push([row, col + 1]);
  }

  return result;
}

let grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
];
grid = [
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1]
];

// grid = [[2, 2, 2, 1, 1]];
grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
];

grid = [
  [2, 2],
  [1, 1],
  [0, 0],
  [2, 0]
];
console.log(orangesRotting(grid));
