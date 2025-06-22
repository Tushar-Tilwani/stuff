/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  const rows = new Array(3).fill().map(() => [0, 0]);
  const cols = new Array(3).fill().map(() => [0, 0]);
  const diagonal = [0, 0];
  const antiDiagonal = [0, 0];

  let current = 0;
  for (const [row, col] of moves) {
    rows[row][current] += 1;
    cols[col][current] += 1;
    if (row - col === 0) {
      diagonal[current] += 1;
    }
    if (row + col === 2) {
      antiDiagonal[current] += 1;
    }
    if (
      rows[row][current] === 3 ||
      cols[col][current] === 3 ||
      diagonal[current] === 3 ||
      antiDiagonal[current] === 3
    ) {
      return getResultStr(current);
    }
    current = current === 0 ? 1 : 0;
  }
  return moves.length === 9 ? "Draw" : "Pending";
};

function getResultStr(id) {
  return id === 0 ? "A" : "B";
}
