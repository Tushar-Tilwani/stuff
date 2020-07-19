/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
  const DP_TABLE = [];

  for (let i = 0; i < matrix.length; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < matrix[0].length; j++) {
      DP_TABLE[i][j] = 1;
    }
  }

  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] > matrix[i - 1][0]) {
      DP_TABLE[i][0] += 1;
    }
  }

  for (let j = 1; j < matrix[0].length; j++) {
    if (matrix[0][j] > matrix[0][j - 1]) {
      DP_TABLE[0][j - 1] += 1;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      let prev = 0;

      if (j > 0 && matrix[i][j] > matrix[i][j - 1]) {
        prev = DP_TABLE[i][j - 1];
      }

      if (i > 0 && matrix[i][j] > matrix[i - 1][j]) {
        prev = Math.max(prev, (DP_TABLE[i - 1] && DP_TABLE[i - 1][j]) || 0);
      }

      DP_TABLE[i][j] = prev + 1;
    }
  }

  let max = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      max = Math.max(max, DP_TABLE[i][j]);
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < matrix[0].length; j++) {
      DP_TABLE[i][j] = 1;
    }
  }

  return max;
};
