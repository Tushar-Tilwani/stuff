/**
 * @param {int32} rows
 * @param {int32} cols
 * @param {int32} start_row
 * @param {int32} start_col
 * @param {int32} end_row
 * @param {int32} end_col
 * @return {int32}
 */
function find_minimum_number_of_moves(
  rows,
  cols,
  start_row,
  start_col,
  end_row,
  end_col
) {
  if (start_row === end_row && start_col === end_col) {
    return 0;
  }

  // Write your code here.
  const QUEUE = [[start_row, start_col, 0]];
  const visited = new Array(rows).fill().map(() => new Array(cols).fill(false));
  visited[start_row][start_col] = true;
  while (QUEUE.length > 0) {
    const [qRow, qCol, dist] = QUEUE.shift();
    const neighbors = getNeighbours(rows, cols, qRow, qCol);
    for (const [nRow, nCol] of neighbors) {
      if (visited[nRow][nCol]) {
        continue;
      }
      if (nRow === end_row && nCol === end_col) {
        return dist + 1;
      }
      visited[nRow][nCol] = true;
      QUEUE.push([nRow, nCol, dist + 1]);
    }
  }

  return -1;
}

function getNeighbours(maxRow, maxCol, row, col) {
  const result = [];

  if (row + 2 < maxRow) {
    col - 1 >= 0 && result.push([row + 2, col - 1]);
    col + 1 < maxCol && result.push([row + 2, col + 1]);
  }

  if (row - 2 >= 0) {
    col - 1 >= 0 && result.push([row - 2, col - 1]);
    col + 1 < maxCol && result.push([row - 2, col + 1]);
  }

  if (col + 2 < maxCol) {
    row + 1 < maxRow && result.push([row + 1, col + 2]);
    row - 1 >= 0 && result.push([row - 1, col + 2]);
  }

  if (col - 2 >= 0) {
    row + 1 < maxRow && result.push([row + 1, col - 2]);
    row - 1 >= 0 && result.push([row - 1, col - 2]);
  }

  return result;
}
