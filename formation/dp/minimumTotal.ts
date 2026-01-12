function calculateMinimumHP(dungeon: number[][]): number {
  const ROWS = dungeon.length;
  const COLS = dungeon[0].length;
  const TABLE = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(Infinity));
  TABLE[ROWS - 1][COLS - 1] = Math.abs(Math.min(1, dungeon[ROWS - 1][COLS - 1]));
  for (let i = ROWS - 2; i >= 0; i--) {
    const bottom = dungeon[i][COLS - 1] - TABLE[i + 1][COLS - 1];
    TABLE[i][COLS - 1] = Math.abs(Math.min(1, bottom));
  }

  for (let j = COLS - 2; j >= 0; j--) {
    const right = dungeon[ROWS - 1][j] - TABLE[ROWS - 1][j + 1];
    TABLE[ROWS - 1][j] = Math.abs(Math.min(1, right));
  }

  // for (let i = ROWS - 1; i >= 0; i--) {
  //   for (let j = COLS - 1; j >= 0; j--) {
  //       if(dungeon[i][j] >= 0) {
  //       }
  //       TABLE[i][j] = Math.min(TABLE[i-1][j] ?? Infinity, TABLE[i][j-1] ?? Infinity) ;
  //   }
  // }

  for (let i = ROWS - 2; i >= 0; i--) {
    for (let j = COLS - 2; j >= 0; j--) {
      const prev = dungeon[i][j] - Math.min(TABLE[i + 1][j], TABLE[i][j + 1]);
      TABLE[i][j] = Math.abs(Math.min(1, prev));
    }
  }

  console.log(TABLE);

  return 0;
}
