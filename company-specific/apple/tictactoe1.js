/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  const ROWS = new Array(3).fill().map(() => [0, 0]);
  const COLS = new Array(3).fill().map(() => [0, 0]);
  const DAIGNOL = [0, 0];
  const ANTI_DAIGNOL = [0, 0];
  let currentPlayer = 0;

  for (const [row, col] of moves) {
    ROWS[row][currentPlayer] += 1;
    COLS[col][currentPlayer] += 1;
    if (row === col) {
      DAIGNOL[currentPlayer] += 1;
    }
    if (row + col === 2) {
      ANTI_DAIGNOL[currentPlayer] += 1;
    }

    if (
      ROWS[row][currentPlayer] === 3 ||
      COLS[col][currentPlayer] === 3 ||
      DAIGNOL[currentPlayer] === 3 ||
      ANTI_DAIGNOL[currentPlayer] === 3
    ) {
      return currentPlayer === 0 ? "A" : "B";
    }
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  }
  return moves.length < 9 ? "Pending" : "Draw";
};
