function calculateMinimumHP(dungeon: number[][]): number {
  const ROWS = dungeon.length;
  const COLS = dungeon[0].length;
  const TABLE = new Array(ROWS).fill(null).map(() => new Array(COLS).fill([0, 0]));
  TABLE[0][0] = [dungeon[0][0], dungeon[0][0]];

  for (let i = 1; i < ROWS; i++) {
    const [prevSum, prevMin] = TABLE[i - 1][0];
    const newSum = dungeon[i][0] + prevSum;
    TABLE[i][0] = [newSum, Math.min(newSum, prevMin)];
  }

  for (let j = 1; j < COLS; j++) {
    const [prevSum, prevMin] = TABLE[0][j - 1];
    const newSum = dungeon[0][j] + prevSum;
    TABLE[0][j] = [newSum, Math.min(newSum, prevMin)];
  }

  for (let i = 1; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      const [prevSumTop, prevMinTop] = TABLE[i - 1][j];
      const newSumTop = dungeon[i][j] + prevSumTop;
      const [prevSumLeft, prevMinLeft] = TABLE[i][j - 1];
      const newSumLeft = dungeon[i][j] + prevSumLeft;

      if (prevMinLeft === prevMinTop) {
        if (newSumLeft > newSumTop) {
          TABLE[i][j] = [newSumLeft, Math.min(newSumLeft, prevMinLeft)];
        } else {
          TABLE[i][j] = [newSumTop, Math.min(newSumTop, prevMinTop)];
        }
      } else if (prevMinLeft > prevMinTop) {
        TABLE[i][j] = [newSumLeft, Math.min(newSumLeft, prevMinLeft)];
      } else {
        TABLE[i][j] = [newSumTop, Math.min(newSumTop, prevMinTop)];
      }
    }
  }
  //

  console.log(TABLE);
  const min = TABLE[ROWS - 1][COLS - 1][1];
  return min >= 0 ? 1 : Math.abs(min) + 1;
}
