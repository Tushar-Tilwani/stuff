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
  const start = [0, 0];
  const end = [maxRows, maxCols];
  let [tRow, tCol] = [0, 0];
  if (maxRows > 0 && maxCols > 0) {
    [tRow, tCol] = searchDiagonal(matrix, start, end, target);
  }

  if (tRow > maxRows || tCol > maxCols) {
    return false;
  }

  if (matrix[tRow][tCol] === target) {
    return true;
  }
  return (
    searchRow(matrix, [0, tCol], [maxRows, tCol], target) ||
    searchCol(matrix, [tRow, 0], [tRow, maxCols], target)
  );
};

function searchDiagonal(matrix, start, end, target) {
  const [sRow, sCol] = start;
  const [eRow, eCol] = end;
  if (sRow > eRow) {
    return [sRow, sCol];
  }

  const mRow = Math.floor((sRow + eRow) / 2);
  const mCol = Math.floor((sCol + eCol) / 2);
  if (matrix[mRow][mCol] === target) {
    return [mRow, mCol];
  } else if (matrix[mRow][mCol] < target) {
    return searchDiagonal(matrix, [mRow + 1, mCol + 1], end, target);
  } else {
    return searchDiagonal(matrix, start, [mRow - 1, mCol - 1], target);
  }
}

function searchRow(matrix, start, end, target) {
  const [sRow, tCol] = start;
  const [eRow] = end;
  if (sRow > eRow) {
    return false;
  }

  const mRow = Math.floor((sRow + eRow) / 2);
  if (matrix[mRow][tCol] === target) {
    return true;
  } else if (matrix[mRow][tCol] < target) {
    return searchRow(matrix, [mRow + 1, tCol], end, target);
  } else {
    return searchRow(matrix, start, [mRow - 1, tCol], target);
  }
}

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
