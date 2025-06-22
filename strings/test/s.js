// https://www.youtube.com/watch?v=3joo9yAZVh8
function printSpirally(matrix) {
  if (!matrix || matrix.length === 0) {
    return "";
  }
  let rowBegin = 0;
  let colBegin = 0;
  let rowEnd = matrix.length - 1;
  let colEnd = matrix[0].length - 1;
  const result = [];

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // To mover left to right
    for (let i = colBegin; i <= colEnd; i++) {
      result.push(matrix[rowBegin][i]);
    }
    rowBegin++;

    // To mover top to bottom
    for (let i = rowBegin; i <= rowEnd; i++) {
      result.push(matrix[i][colEnd]);
    }
    colEnd--;

    if (rowBegin <= rowEnd) {
      // To mover right to left
      for (let i = colEnd; i >= colBegin; i--) {
        result.push(matrix[rowEnd][i]);
      }
      rowEnd--;
    }

    if (colBegin <= colEnd) {
      // To mover bottom to top
      for (let i = rowEnd; i >= rowBegin; i--) {
        result.push(matrix[i][colBegin]);
      }
      colBegin++;
    }
  }

  return result.join("");
}

let matrix = [
  ["X", "Y", "A"],

  ["M", "B", "C"],

  ["P", "Q", "R"]
];
// matrix = [["X", "Y"]];

console.log(printSpirally(matrix));
