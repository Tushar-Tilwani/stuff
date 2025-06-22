/*
Complete the fumction numberOfPaths
The fumction takes integers 2D integer array, matrix, as parameter.
*/
function numberOfPaths(matrix) {
  // Write your code here
  const DPTable = [];
  const maxRows = matrix.length;
  const maxCols = matrix[0].length;

  for (let i = 0; i < maxRows; i++) {
    DPTable[i] = [];
    for (let j = 0; j < maxCols; j++) {
      DPTable[i].push(0);
    }
  }

  for (let i = 0; i < maxRows; i++) {
    if (matrix[i][0] === 1) {
      DPTable[i][0] = 1;
    }
  }

  for (let j = 0; j < maxCols; j++) {
    if (matrix[0][j] === 1) {
      DPTable[0][j] = 1;
    }
  }

  for (let i = 1; i < maxRows; i++) {
    for (let j = 1; j < maxCols; j++) {
      if (matrix[i][j] == 1) {
        DPTable[i][j] = DPTable[i - 1][j] + DPTable[i][j - 1];
      }
    }
  }

  return DPTable[maxRows - 1][maxCols - 1];
}
