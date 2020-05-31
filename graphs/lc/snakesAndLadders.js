// https://leetcode.com/problems/snakes-and-ladders/

/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
  const startNode = board[board.length - 1][0];
  const endNode = board[0][0];
  const numericalVal = [];
};

function bfs() {}

function getNodeList(board) {
  const result = [];
  const MAX_COL = board[0].length - 1;
  let isRight = true;
  let inc = isRight ? 1 : -1;
  let row = board.length - 1;
  let col = 0;

  while (row >= 0) {
    result.push([row, col]);
    col += inc;
    if (col > MAX_COL || col < 0) {
      isRight = !isRight;
      col = isRight ? 0 : MAX_COL;
      inc = isRight ? 1 : -1;
      row -= 1;
    }
  }

  return result;
}

function getNeighbors1(board, sRow, sCol) {
  const result = [];
  const MAX_COL = board[0].length - 1;
  let isRight = true;
  let inc = isRight ? 1 : -1;
  let row = sRow;
  let col = sCol;
  let counter = 0;

  while (counter < 6) {
    col += inc;

    if (col > MAX_COL || col < 0) {
      row -= 1;
      if (row < 0) {
        break;
      }
      isRight = !isRight;
      col = isRight ? 0 : MAX_COL;
      inc = isRight ? 1 : -1;
    }
    result.push([row, col]);
    counter++;
  }

  return result;
}

let board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1]
];

// console.log(getNeighbors(board, 1, 3));
console.log(getNodeList(board), board.length * board[0].length);
