/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  if (matrix.length === 0) {
    return false;
  }
  const maxRows = matrix.length - 1;
  const maxCols = matrix[0].length - 1;

  for (let row = 0; row <= maxRows; row++) {
    if (searchCol(matrix, [row, 0], [row, maxCols], target)) {
      return true;
    }
  }
};

function searchCol(matrix, start, end, target) {
  const [tRow, sCol] = start;
  const [, eCol] = end;
  if (sCol > eCol) {
    return false;
  }

  const mCol = Math.floor((sCol + eCol) / 2);
  if (matrix[tRow][mCol] === target) {
    return true;
  } else if (matrix[tRow][mCol] < target) {
    return searchCol(matrix, [tRow, mCol + 1], end, target);
  } else {
    return searchCol(matrix, start, [tRow, mCol - 1], target);
  }
}

// [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
//23
