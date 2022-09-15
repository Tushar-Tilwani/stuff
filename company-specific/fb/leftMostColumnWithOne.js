/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} row, col
 *     @return {integer}
 *     this.get = function(row, col) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
var leftMostColumnWithOne = function (binaryMatrix) {
  const [endRow, endCol] = binaryMatrix.dimensions();
  let [currRow, currCol] = [0, endCol - 1];
  let [prevRow, prevCol] = [null, null];
  let hasOne = false;
  while (currCol >= 0 && currRow < endRow) {
    [prevRow, prevCol] = [currRow, currCol];
    if (binaryMatrix.get(currRow, currCol) === 0) {
      if (hasOne) {
        return prevCol;
      }
      currRow++;
    } else {
      hasOne = true;

      currCol--;
    }
  }

  return hasOne ? prevCol : -1;
};
