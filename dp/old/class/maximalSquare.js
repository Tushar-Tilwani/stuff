/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const DP = [];
  const MAX_ROWS = matrix.length;
  const MAX_COLS = matrix[0].length;

  for (let i = 0; i < MAX_ROWS; i++) {
    DP[i] = [];
    for (let j = 0; j < MAX_COLS; j++) {
      DP[i][j] = null;
    }
  }

  for (let i = 0; i < MAX_ROWS; i++) {
    DP[i][0] = parseInt(matrix[i][0]);
  }

  for (let j = 0; j < MAX_COLS; j++) {
    DP[0][j] = parseInt(matrix[0][j]);
  }

  for (let i = 1; i < MAX_ROWS; i++) {
    for (let j = 1; j < MAX_COLS; j++) {
      if (matrix[i][j] == 1) {
        if (DP[i - 1][j - 1] == 0 || DP[i][j - 1] == 0 || DP[i - 1][j] == 0) {
          DP[i][j] = parseInt(matrix[i][j]);
          continue;
        }

        if (
          DP[i - 1][j - 1] == DP[i][j - 1] &&
          DP[i - 1][j - 1] == DP[i - 1][j]
        ) {
          DP[i][j] = DP[i - 1][j - 1] + 1;
          continue;
        }

        DP[i][j] = Math.max(DP[i - 1][j - 1], DP[i][j - 1], DP[i - 1][j]);
      } else {
        DP[i][j] = 0;
      }
    }
  }
  console.log(DP);

  let result = -Infinity;

  for (let i = 0; i < MAX_ROWS; i++) {
    for (let j = 0; j < MAX_COLS; j++) {
      result = Math.max(result, DP[i][j]);
    }
  }

  return result * result;
};
