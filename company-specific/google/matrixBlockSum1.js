/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
 var matrixBlockSum = function (mat, k) {
    const result = [];
    for (let i = 0; i < mat.length; i++) {
      result[i] = [];
      for (let j = 0; j < mat[0].length; j++) {
        result[i][j] = 0;
        for (
          let row = Math.max(0, i - k);
          row <= Math.min(mat.length - 1, i + k);
          row++
        ) {
          for (
            let col = Math.max(0, j - k);
            col <= Math.min(mat[0].length - 1, j + k);
            col++
          ) {
            result[i][j] += mat[row][col];
          }
        }
      }
    }
    return result;
  };
  