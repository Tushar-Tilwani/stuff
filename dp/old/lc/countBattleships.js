/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function(board) {
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;

  let result = 0;

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (
        board[i][j] === "X" &&
        !(board[i - 1] && board[i - 1][j] === "X") &&
        !(board[i][j - 1] && board[i][j - 1] === "X")
      ) {
        result += 1;
      }
    }
  }

  return result;
};
