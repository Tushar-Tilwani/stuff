/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  const TABLE = new Array(matrix.length + 1)
    .fill()
    .map(() => new Array(matrix[0].length + 1).fill(0));

  let result = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 1) {
        // +1 because table is one row/col bigger
        TABLE[i + 1][j + 1] =
          Math.min(TABLE[i][j + 1], TABLE[i + 1][j], TABLE[i][j]) + 1;
        result += TABLE[i + 1][j + 1];
      }
    }
  }
  return result;
};
