/**
 * @param {list_list_int32} board
 * @return {list_list_int32}
 */
function solve_sudoku_puzzle(board) {
  const result = [];
  helper(board, 0, 0, result);
  return result[0];
}

function helper(board, row, col, result) {
  // Just for optimization
  if (result.length > 1) {
    return;
  }
  const max_rows = board.length;
  const max_cols = board[0].length;
  if (row === max_rows - 1 && col === max_cols) {
    result.push(board.map((boardRow) => boardRow.slice(0)));
    return;
  }

  if (col === max_cols) {
    row = row + 1;
    col = 0;
  }

  if (board[row][col] !== 0) {
    helper(board, row, col + 1, result);
    return;
  }

  for (let i = 1; i < 10; i++) {
    board[row][col] = i;
    if (isNumberValid(board, row, col)) {
      helper(board, row, col + 1, result);
    }
    board[row][col] = 0;
  }
}

function isNumberValid(board, row, col) {
  const max_rows = board.length;
  const max_cols = board[0].length;
  const currentCellValue = board[row][col];

  // row test
  for (let i = 0; i < max_rows; i++) {
    if (row === i) {
      continue;
    }
    if (board[i][col] === currentCellValue) {
      return false;
    }
  }

  // col test
  for (let j = 0; j < max_cols; j++) {
    if (col === j) {
      continue;
    }
    if (board[row][j] === currentCellValue) {
      return false;
    }
  }

  //quadrent test
  const quad_row_start = Math.floor(row / 3) * 3;
  const quad_col_start = Math.floor(col / 3) * 3;
  for (let i = quad_row_start; i < quad_row_start + 3; i++) {
    for (let j = quad_col_start; j < quad_col_start + 3; j++) {
      if (i === row && j === col) {
        continue;
      }
      if (board[i][j] === currentCellValue) {
        return false;
      }
    }
  }

  return true;
}

const board = [
  [8, 4, 9, 0, 0, 3, 5, 7, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 0, 0, 9, 0, 0, 8, 3],
  [0, 0, 0, 9, 4, 6, 7, 0, 0],
  [0, 8, 0, 0, 5, 0, 0, 4, 0],
  [0, 0, 6, 8, 7, 2, 0, 0, 0],
  [5, 7, 0, 0, 1, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 2, 1, 7, 0, 0, 8, 6, 5],
];
console.log(solve_sudoku_puzzle(board));
