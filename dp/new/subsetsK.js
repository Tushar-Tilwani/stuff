/**
 * @param {number} numRows
 * @return {number[][]}
 */

function generate(n) {
  const TABLE = [[1]];
  for (let i = 1; i < n; i++) {
    TABLE[i] = [];
    for (let j = 0; j <= i; j++) {
      TABLE[i][j] = get(TABLE, i - 1, j - 1) + get(TABLE, i - 1, j);
    }
  }
  return TABLE;
}

function get(arr, i, j) {
  if (arr && arr[i] && arr[i][j]) {
    return arr[i][j];
  }
  return 0;
}

function get(arr, i, j) {
  if (arr && arr[i] && arr[i][j]) {
    return arr[i][j];
  }
  return 0;
}
