/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
  let sum = 0;
  const size = mat.length - 1;
  for (let i = 0; i <= size; i++) {
    sum += mat[i][i];
    sum += mat[i][size - i];
  }

  if (size % 2 === 1) {
    const mid = Math.floor(size / 2);
    sum -= mat[mid][mid];
  }

  return sum;
};
