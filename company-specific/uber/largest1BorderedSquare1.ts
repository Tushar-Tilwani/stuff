//[[1,1,1,1],[1,0,1,1],[1,0,1,0],[1,1,0,1]]
function largest1BorderedSquare(grid: number[][]): number {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;
  const TABLE = Array.from({ length: MAX_ROW + 1 }, () => Array.from({ length: MAX_COL + 1 }, () => [0, 0]));
  TABLE[0][0] = grid[0][0] === 1 ? [1, 1] : [0, 0];
  for (let i = 1; i <= MAX_ROW; i++) {
    if (grid[i][0] === 1) {
      const [pRow, pCol] = TABLE[i - 1][0];
      TABLE[i][0] = [pRow + 1, pCol];
    }
  }
  for (let j = 1; j <= MAX_COL; j++) {
    if (grid[0][j] === 1) {
      const [pRow, pCol] = TABLE[0][j - 1];
      TABLE[0][j] = [pRow, pCol + 1];
    }
  }

  for (let i = 1; i <= MAX_ROW; i++) {
    for (let j = 1; j <= MAX_COL; j++) {
      if (grid[i][j] === 1) {
        const [pRow] = TABLE[i - 1][j];
        const [, pCol] = TABLE[i][j - 1];
        TABLE[i][j] = [pRow + 1, pCol + 1];
      }
    }
  }

  const TABLE_REV = Array.from({ length: MAX_ROW + 1 }, () => Array.from({ length: MAX_COL + 1 }, () => [0, 0]));
  TABLE_REV[MAX_ROW][MAX_COL] = grid[MAX_ROW][MAX_COL] === 1 ? [1, 1] : [0, 0];

  for (let i = MAX_ROW - 1; i >= 0; i--) {
    if (grid[i][MAX_COL] === 1) {
      const [pRow, pCol] = TABLE_REV[i + 1][MAX_COL];
      TABLE_REV[i][MAX_COL] = [pRow + 1, pCol];
    }
  }
  for (let j = MAX_COL - 1; j >= 0; j--) {
    if (grid[MAX_ROW][j] === 1) {
      const [pRow, pCol] = TABLE_REV[MAX_ROW][j + 1];
      TABLE_REV[MAX_ROW][j] = [pRow, pCol + 1];
    }
  }

  for (let i = MAX_ROW - 1; i >= 0; i--) {
    for (let j = MAX_COL - 1; j >= 0; j--) {
      if (grid[i][j] === 1) {
        const [pRow] = TABLE_REV[i + 1][j];
        const [, pCol] = TABLE_REV[i][j + 1];
        TABLE_REV[i][j] = [pRow + 1, pCol + 1];
      }
    }
  }
  let max = 0;
  for (let i = 0; i <= MAX_ROW; i++) {
    for (let j = 0; j <= MAX_COL; j++) {
      if (grid[i][j] !== 1) {
        continue;
      }
      max = Math.max(max, 1);
      const [rRow1, rCol1] = TABLE_REV[i][j];
      const [rRow2, rCol2] = TABLE[i + rRow1 - 1]?.[j + rCol1 - 1] ?? [0, 0];
      const square = Math.min(Math.min(rRow2, rRow1), Math.min(rCol1, rCol2));
      max = Math.max(max, square * square);
    }
  }
  for (let i = MAX_ROW - 1; i >= 0; i--) {
    for (let j = MAX_COL - 1; j >= 0; j--) {
      if (grid[i][j] !== 1) {
        continue;
      }
      const [eRow1, eCol1] = TABLE[i][j];
      const [eRow2, eCol2] = TABLE_REV[i - eRow1 + 1]?.[j - eCol1 + 1] ?? [0, 0];
      const square = Math.min(Math.min(eRow1, eRow2), Math.min(eCol2, eCol2));
      max = Math.max(max, square * square);
    }
  }

  return max;
}
