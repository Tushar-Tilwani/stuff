function getRow(rowIndex: number): number[] {
  const TABLE = new Array(rowIndex).fill(null).map(() => new Array(rowIndex).fill(0));
  TABLE[0][0] = 1;
  console.log(TABLE);
  for (let i = 1; i <= rowIndex; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        TABLE[i][j] = TABLE[i - 1][j];
      } else {
        TABLE[i][j] = TABLE[i - 1][j - 1] + TABLE[i - 1][j];
      }
    }
  }

  return TABLE[rowIndex];
}
