// Single binary Search

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
  const MAX_ROW = matrix.length;
  if (MAX_ROW === 0) {
    return false;
  }
  const MAX_COL = matrix[0].length;
  let start = 0;
  let end = MAX_ROW * MAX_COL - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const [row, col] = converter(mid, MAX_COL);
    const num = matrix[row][col];
    if (target === num) {
      return true;
    }

    if (target < num) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return false;
};

function converter(num, MAX_COL) {
  return [Math.floor(num / MAX_COL), num % MAX_COL];
}
