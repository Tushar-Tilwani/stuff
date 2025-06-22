const MOD = Math.pow(10, 9) + 7;
/**
 * @param {list_list_int32} matrix
 * @return {int32}
 */
function number_of_paths(matrix) {
  const MAX_ROWS = matrix.length;
  const MAX_COLS = matrix[0].length;
  const TABLE = new Array(MAX_ROWS)
    .fill()
    .map(() => new Array(MAX_COLS).fill(0));

  for (let i = 0; i < MAX_ROWS; i++) {
    if (matrix[i][0] !== 1) {
      break;
    }
    TABLE[i][0] = 1;
  }

  for (let j = 0; j < MAX_COLS; j++) {
    if (matrix[0][j] !== 1) {
      break;
    }
    TABLE[0][j] = 1;
  }

  for (let i = 1; i < MAX_ROWS; i++) {
    for (let j = 1; j < MAX_COLS; j++) {
      if (matrix[i][j] !== 1) {
        continue;
      }
      TABLE[i][j] = (TABLE[i - 1][j] + TABLE[i][j - 1]) % MOD;
    }
  }

  return TABLE[MAX_ROWS - 1][MAX_COLS - 1] % MOD;
}
