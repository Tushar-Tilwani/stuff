/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
function solveSudoku(board) {
  const result = [];
  helper(board, 0, 0, result);
  const newBoard = result[0];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = newBoard[i][j];
    }
  }
}

function helper(board, row, col, result) {
  // Base Case
  if (row === board.length - 1 && col === board[0].length) {
    result.push(board.map((row) => row.slice(0)));
    return;
  }

  // Incase col reaches end
  if (col === board[0].length) {
    col = 0;
    row = row + 1;
  }

  if (result.length > 1) {
    return;
  }

  // Skip placement
  if (board[row][col] !== ".") {
    helper(board, row, col + 1, result);
    return;
  }

  // try all placements
  for (let i = 1; i < 10; i++) {
    board[row][col] = `${i}`;
    //Back Tracking case
    if (isValid(board, row, col)) {
      helper(board, row, col + 1, result);
    }
    board[row][col] = ".";
  }
}

function isValid(board, row, col) {
  for (let i = 0; i < board[0].length; i++) {
    if (i === col) {
      continue;
    }
    if (board[row][i] === board[row][col]) {
      return false;
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (i === row) {
      continue;
    }
    if (board[i][col] === board[row][col]) {
      return false;
    }
  }

  const rowSquare = Math.floor(row / 3) * 3;
  const colSquare = Math.floor(col / 3) * 3;

  for (let i = rowSquare; i < rowSquare + 3; i++) {
    for (let j = colSquare; j < colSquare + 3; j++) {
      if (row === i && col === j) {
        continue;
      }

      if (board[i][j] === board[row][col]) {
        return false;
      }
    }
  }

  return true;
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(solveSudoku(board));
