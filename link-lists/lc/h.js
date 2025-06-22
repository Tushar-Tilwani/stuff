/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const wordArr = word.split("");
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;
  const startIndex = 0;
  const visited = getVisitedArrr(MAX_ROW, MAX_COL);

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (dfs(board, i, j, visited, startIndex, wordArr)) {
        return true;
      }
    }
  }

  return false;
};

function dfs(board, row, col, visited, index, wordArr) {
  if (index === wordArr.length) {
    return true;
  }

  if (wordArr[index] !== board[row][col]) {
    return false;
  }

  visited[row][col] = true;
  let result = false;
  const neighbhors = getNeighbhors(board, row, col);
  for (const [nRow, nCol] of neighbhors) {
    if (!visited[nRow][nCol] && !result) {
      result = dfs(board, nRow, nCol, visited, index + 1, wordArr);
    }
  }
  visited[row][col] = false;

  return result;
}

function getVisitedArrr(MAX_ROW, MAX_COL) {
  const visited = [];

  for (let i = 0; i < MAX_ROW; i++) {
    visited[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      visited[i][j] = false;
    }
  }

  return visited;
}

function getNeighbhors(board, row, col) {
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;
  const result = [];

  if (row > 0) {
    result.push([row - 1, col]);
  }

  if (row < MAX_ROW - 1) {
    result.push([row + 1, col]);
  }

  if (col > 0) {
    result.push([row, col - 1]);
  }

  if (col < MAX_COL - 1) {
    result.push([row, col + 1]);
  }

  return result;
}
