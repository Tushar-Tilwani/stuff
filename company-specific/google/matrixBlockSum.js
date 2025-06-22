/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  const prefixSum = new Array(mat.length + 1)
    .fill()
    .map(() => new Array(mat[0].length + 1).fill(0));
  for (let i = 1; i <= mat.length; i++) {
    for (let j = 1; j <= mat[0].length; j++) {
      prefixSum[i][j] =
        mat[i - 1][j - 1] +
        prefixSum[i - 1][j] +
        prefixSum[i][j - 1] -
        prefixSum[i - 1][j - 1];
    }
  }

  const result = [];
  for (let i = 0; i < mat.length; i++) {
    result[i] = [];
    for (let j = 0; j < mat[0].length; j++) {
      const r1 = Math.max(i - k, 0);
      const c1 = Math.max(j - k, 0);
      const r2 = Math.min(i + k + 1, prefixSum.length - 1);
      const c2 = Math.min(j + k + 1, prefixSum[0].length - 1);
      result[i][j] =
        prefixSum[r2][c2] -
        prefixSum[r2][c1] -
        prefixSum[r1][c2] +
        prefixSum[r1][c1];
    }
  }

  return result;
};
