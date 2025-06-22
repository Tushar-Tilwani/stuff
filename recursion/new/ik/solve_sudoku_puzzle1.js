const BOARD_SQUARE = 3;
const BOARD_SIZE = BOARD_SQUARE * BOARD_SQUARE;

/**
 * @param {list_list_intBOARD_SQUARE_SIZE2} board
 * @return {list_list_intBOARD_SQUARE_SIZE2}
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
  if (row === BOARD_SIZE - 1 && col === BOARD_SIZE) {
    result.push(board.map((boardRow) => boardRow.slice(0)));
    return;
  }

  if (col === BOARD_SIZE) {
    row = row + 1;
    col = 0;
  }

  if (board[row][col] !== 0) {
    helper(board, row, col + 1, result);
    return;
  }

  for (let i = 1; i < 10; i++) {
    if (isNumberValid(board, i, row, col)) {
      board[row][col] = i;
      helper(board, row, col + 1, result);
      board[row][col] = 0;
    }
  }
}

function isNumberValid(board, number, row, col) {
  // row test
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i][col] === number) {
      return false;
    }
    if (board[row][i] === number) {
      return false;
    }
  }

  //quadrent test
  const quad_row_start = Math.floor(row / BOARD_SQUARE) * BOARD_SQUARE;
  const quad_row_end = quad_row_start + BOARD_SQUARE;

  const quad_col_start = Math.floor(col / BOARD_SQUARE) * BOARD_SQUARE;
  const quad_col_end = quad_col_start + BOARD_SQUARE;

  for (let i = quad_row_start; i < quad_row_end; i++) {
    for (let j = quad_col_start; j < quad_col_end; j++) {
      if (board[i][j] === number) {
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
