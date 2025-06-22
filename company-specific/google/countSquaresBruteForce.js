/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  const maxSquareSide = Math.min(matrix.length, matrix[0].length);
  let result = 0;

  for (let s = 0; s < maxSquareSide; s++) {
    for (let i = 0; i < matrix.length - s; i++) {
      for (let j = 0; j < matrix[0].length - s; j++) {
        if (checkAllOnes(matrix, i, j, i + s, j + s)) {
          result += 1;
        }
      }
    }
  }
  return result;
};

function checkAllOnes(matrix, rowStart, rowEnd, colStart, colEnd) {
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      if (!matrix[i] || matrix[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
}
