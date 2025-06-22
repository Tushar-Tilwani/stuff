/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  const MAX_ROWS = board.length;
  const MAX_COLS = board[0].length;
  const MAX_CELL = 3;

  for (let i = 0; i < MAX_ROWS; i++) {
    const rowSet = new Set();
    for (let j = 0; j < MAX_COLS; j++) {
      if (board[i][j] === ".") {
        continue;
      }
      if (rowSet.has(board[i][j])) {
        return false;
      }
      rowSet.add(board[i][j]);
    }
  }

  for (let j = 0; j < MAX_COLS; j++) {
    const colSet = new Set();
    for (let i = 0; i < MAX_ROWS; i++) {
      if (board[i][j] === ".") {
        continue;
      }
      if (colSet.has(board[i][j])) {
        return false;
      }
      colSet.add(board[i][j]);
    }
  }

  for (let rowCell = 0; rowCell < MAX_CELL; rowCell++) {
    for (let colCell = 0; colCell < MAX_CELL; colCell++) {
      if (
        !checkCell({
          board,
          rowStart: rowCell * MAX_CELL,
          rowEnd: (rowCell + 1) * MAX_CELL - 1,
          colStart: colCell * MAX_CELL,
          colEnd: (colCell + 1) * MAX_CELL - 1,
        })
      ) {
        return false;
      }
    }
  }

  return true;
};

function checkCell({ board, rowStart, rowEnd, colStart, colEnd }) {
  const cellSet = new Set();
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      //   console.log([i, j]);
      if (board[i][j] === ".") {
        continue;
      }

      if (cellSet.has(board[i][j])) {
        return false;
      }
      cellSet.add(board[i][j]);
    }
  }
  return true;
}

// console.log(
//   isValidSudoku([
//     [".", ".", ".", ".", "5", ".", ".", "1", "."],
//     [".", "4", ".", "3", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "3", ".", ".", "1"],
//     ["8", ".", ".", ".", ".", ".", ".", "2", "."],
//     [".", ".", "2", ".", "7", ".", ".", ".", "."],
//     [".", "1", "5", ".", ".", ".", ".", ".", "."],
//     [".", ".", ".", ".", ".", "2", ".", ".", "."],
//     [".", "2", ".", "9", ".", ".", ".", ".", "."],
//     [".", ".", "4", ".", ".", ".", ".", ".", "."],
//   ])
// );
