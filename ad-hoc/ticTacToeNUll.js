/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function(n) {
  this.mat = initialize(n);
  
  this.max = n * n;
  this.currentMove = 0;

  this.rowsResult = new Array(n).fill(0);
  this.colsResult = new Array(n).fill(0);
  this.daignolResult = 0;
  this.antiDaignolResult = 0;
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
  this.currentMove += 1;
  this.mat[row][col] = player;
  return 0;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */

function initialize(n) {
  const mat = [];
  for (let i = 0; i < n; i++) {
    mat[i] = [];
    for (let j = 0; j < n; j++) {
      mat[i][j] = 0;
    }
  }
  return mat;
}
