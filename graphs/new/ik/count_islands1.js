/**
 * @param {list_list_int32} matrix
 * @return {int32}
 */
function count_islands(matrix) {
  const MAX_ROW = matrix.length;
  const MAX_COL = matrix[0].length;
  // Write your code here.
  const visited = new Array(MAX_ROW)
    .fill()
    .map(() => new Array(MAX_COL).fill(false));

  let components = 0;

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (visited[i][j] || matrix[i][j] != 1) {
        continue;
      }
      visited[i][j] = true;
      dfs(matrix, i, j, visited);
      components++;
    }
  }

  return components;
}

function dfs(matrix, row, col, visited) {
  const neighbours = getNeighbours(matrix, row, col);
  for (const [nRow, nCol] of neighbours) {
    if (visited[nRow][nCol]) {
      continue;
    }
    visited[nRow][nCol] = true;
    dfs(matrix, nRow, nCol, visited);
  }
}

function getNeighbours(matrix, row, col) {
  const result = [];
  const MAX_ROW = matrix.length;
  const MAX_COL = matrix[0].length;

  if (row + 1 < MAX_ROW && matrix[row + 1][col] == 1) {
    result.push([row + 1, col]);
  }

  if (row - 1 >= 0 && matrix[row - 1][col] == 1) {
    result.push([row - 1, col]);
  }

  if (col + 1 < MAX_COL && matrix[row][col + 1] == 1) {
    result.push([row, col + 1]);
  }

  if (col - 1 >= 0 && matrix[row][col - 1] == 1) {
    result.push([row, col - 1]);
  }

  if (row - 1 >= 0 && col - 1 >= 0 && matrix[row - 1][col - 1] == 1) {
    result.push([row - 1, col - 1]);
  }

  if (row + 1 < MAX_ROW && col - 1 >= 0 && matrix[row + 1][col - 1] == 1) {
    result.push([row + 1, col - 1]);
  }

  if (row - 1 >= 0 && col + 1 < MAX_COL && matrix[row - 1][col + 1] == 1) {
    result.push([row - 1, col + 1]);
  }

  if (row + 1 < MAX_ROW && col + 1 < MAX_COL && matrix[row + 1][col + 1] == 1) {
    result.push([row + 1, col + 1]);
  }

  return result;
}
