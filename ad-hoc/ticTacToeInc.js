/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function(n) {
  this.rows = new Array(n).fill(0);
  this.cols = new Array(n).fill(0);
  this.diagnal = 0;
  this.antiDiagnal = 0;
  this.n;
};

/**
 * Player {player} makes a move at ({row}, {col}).
        @param row The row of the board.
        @param col The column of the board.
        @param player The player, can be either 1 or 2.
        @return The current winning condition, can be either:
                0: No one wins.
                1: Player 1 wins.
                2: Player 2 wins. 
 * @param {number} row 
 * @param {number} col 
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function(row, col, player) {
  const { n } = this;
  const inc = player === 1 ? 1 : -1;

  this.rows[row] += inc;
  this.cols[col] += inc;
  if (row === col) {
    this.diagnal += inc;
  }

  if (row + col === n) {
    this.antiDiagnal += inc;
  }

  if (
    Math.abs(this.rows[row]) === n ||
    Math.abs(this.cols[col]) === n ||
    Math.abs(this.diagnal) === n ||
    Math.abs(this.antiDiagnal) === n
  ) {
    return player;
  }

  return 0;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */
