/**
 * @param {character[][]} grid
 * @return {number}
 */
var maxKilledEnemies = function (grid) {
  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "0") {
        result = Math.max(result, getEnemyKilledForCell(i, j, grid));
      }
    }
  }
  return result;
};

function getEnemyKilledForCell(row, col, grid) {
  return getEnemyKilledForRow(row, col, grid) + getEnemyKilledForCol(row, col, grid);
}

function getEnemyKilledForRow(row, col, grid) {
  if (row > grid.length - 1 || row < 0) {
    return 0;
  }

  let count = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][col] === "W") {
      break;
    }
    count += grid[i][col] === "E" ? 1 : 0;
  }

  for (let i = row + 1; i < grid.length; i++) {
    if (grid[i][col] === "W") {
      break;
    }
    count += grid[i][col] === "E" ? 1 : 0;
  }

  return count;
}

function getEnemyKilledForCol(row, col, grid) {
  if (col > grid[0].length - 1 || col < 0) {
    return 0;
  }
  if (grid[row][col] === "W") {
    return 0;
  }

  let count = 0;
  for (let i = col - 1; i >= 0; i--) {
    if (grid[row][i] === "W") {
      break;
    }
    count += grid[row][i] === "E" ? 1 : 0;
  }

  for (let i = col + 1; i < grid[0].length; i++) {
    if (grid[row][i] === "W") {
      break;
    }
    count += grid[row][i] === "E" ? 1 : 0;
  }

  return count;
}
