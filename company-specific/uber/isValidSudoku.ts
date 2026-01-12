function isValidSudoku(board: string[][]): boolean {
  return checkValidRow(board);
}

function checkValidRow(board: string[][]) {
  for (let i = 0; i < board.length; i++) {
    const unquieSet = new Set();
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== "." && unquieSet.has(board[i][j])) {
        return false;
      }
      unquieSet.add(board[i][j]);
    }
  }
  return true;
}

function checkValidCol(board: string[][]) {
  for (let j = 0; j < board[0].length; j++) {
    const unquieSet = new Set();
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== "." && unquieSet.has(board[i][j])) {
        return false;
      }
      unquieSet.add(board[i][j]);
    }
  }
  return true;
}

function checkValidGrid(board: string[][]) {
  const DIV = 3;
  for (let k = 0; k < DIV * DIV; k++) {
    const rowStart = Math.floor(k / DIV) * DIV;
    const colStart = (k % DIV) * DIV;
    const unquieSet = new Set();
    for (let i = rowStart; i < rowStart + DIV; i++) {
      for (let j = colStart; j < colStart + DIV; j++) {
        if (board[i][j] !== "." && unquieSet.has(board[i][j])) {
          return false;
        }
        unquieSet.add(board[i][j]);
      }
    }
  }
  return true;
}
