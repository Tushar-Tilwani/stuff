/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (matrix.length === 0) {
    return 0;
  }
  const DP_TABLE = [];

  const MAX_ROW = matrix.length;
  const MAX_COL = matrix[0].length;
  let maxArea = 0;
  for (let i = 0; i < MAX_ROW; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      if (matrix[i][j] === "1") {
        maxArea = 1;
        DP_TABLE[i][j] = { row: 1, col: 1 };
      } else {
        DP_TABLE[i][j] = { row: 0, col: 0 };
      }
    }
  }

  for (let i = 1; i < MAX_ROW; i++) {
    const { row: prevRow } = DP_TABLE[i - 1][0];
    DP_TABLE[i][0].row += prevRow;
    maxArea = Math.max(maxArea, DP_TABLE[i][0].row);
  }

  for (let j = 1; j < MAX_COL; j++) {
    const { col: prevCol } = DP_TABLE[0][j - 1];
    DP_TABLE[0][j].col += prevCol;
    maxArea = Math.max(maxArea, DP_TABLE[0][j].col);
  }

  for (let i = 1; i < MAX_ROW; i++) {
    for (let j = 1; j < MAX_COL; j++) {
      if (matrix[i][j] === "0") {
        continue;
      }
      const { row: prevRow } = DP_TABLE[i - 1][j];
      DP_TABLE[i][j].row += prevRow;

      const { col: prevCol } = DP_TABLE[i][j - 1];
      DP_TABLE[i][j].col += prevCol;

      let area =
        DP_TABLE[i][j].row *
        Math.min(DP_TABLE[i - 1][j].col, DP_TABLE[i][j].col);

      maxArea = Math.max(maxArea, area, DP_TABLE[i][j].row, DP_TABLE[i][j].col);
    }
  }

  console.log(DP_TABLE);

  return maxArea;
};

const mat = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];

console.log(maximalRectangle(mat));
