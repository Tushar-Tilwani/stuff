/*
 * Complete the function below.
 */
const STATE = {
  ROW: "row",
  COL: "col"
};
function printSpirally(matrix) {
  const set = new Set();
  const MAX_COL = matrix[0].length;
  const MAX_ROW = matrix.length;
  const MAX = MAX_COL * MAX_ROW;
  const result = [];

  let isRowMove = false;
  let inc = 1;
  let col = 0;
  let row = 0;
  let index = 0;
  while (index < MAX) {
    result.push(matrix[row][col]);
    index++;
    set.add(`${row}${col}`);

    if (!isRowMove) {
      col += inc;
    } else {
      row += inc;
    }

    if (!isRowMove) {
      if (col === MAX_COL - 1 || col === 0 || set.has(`${row}${col}`)) {
        isRowMove = true;
      }
    } else {
      if (row === MAX_ROW - 1 || row === 0 || set.has(`${row}${col}`)) {
        isRowMove = false;
        inc = -inc;
      }
    }
  }
  return result;
}
const matrix = [
  ["X", "Y", "A"],

  ["M", "B", "C"],

  ["P", "Q", "R"]
];

console.log(printSpirally(matrix));
