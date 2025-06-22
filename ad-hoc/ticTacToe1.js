/**
 * Initialize your data structure here.
 * @param {number} n
 */
var TicTacToe = function(n) {
  this.rowResults = new Array(n).fill(null).map(() => [0, 0]);
  this.colResults = new Array(n).fill(null).map(() => [0, 0]);
  this.diagonal = [0, 0];
  this.antiDiagonal = [0, 0];
  this.MAX = n;
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
  const playerIndex = player - 1;
  const { MAX } = this;

  this.rowResults[row][playerIndex] += 1;
  if (this.rowResults[row][playerIndex] === MAX) {
    return player;
  }

  this.colResults[col][playerIndex] += 1;
  if (this.colResults[col][playerIndex] === MAX) {
    return player;
  }

  if (row === col) {
    this.diagonal[playerIndex] += 1;
    if (this.diagonal[playerIndex] === MAX) {
      return player;
    }
  }

  if (row + col === MAX) {
    this.antiDiagonal[playerIndex] += 1;
    if (this.antiDiagonal[playerIndex] === MAX) {
      return player;
    }
  }

  return 0;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */
