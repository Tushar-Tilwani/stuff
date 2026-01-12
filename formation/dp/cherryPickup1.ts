type NDArray<T> = T | NDArray<T>[];

function cherryPickup(grid: number[][]): number {
  const length = grid.length;
  const TABLE = getTable(length, 4) as number[][][][];

  // ✅ Base case
  TABLE[0][0][0][0] = grid[0][0];

  // IMPORTANT: iterate by total steps taken
  for (let step = 1; step <= 2 * (length - 1); step++) {
    for (let row1 = 0; row1 <= step; row1++) {
      for (let row2 = 0; row2 <= step; row2++) {

        const col1 = step - row1;
        const col2 = step - row2;

        // bounds check
        if (
          row1 < 0 || row1 >= length || col1 < 0 || col1 >= length ||
          row2 < 0 || row2 >= length || col2 < 0 || col2 >= length
        ) continue;

        // blocked cells
        if (grid[row1][col1] === -1 || grid[row2][col2] === -1) continue;

        let bestPrev = Math.max(
          TABLE?.[row1 - 1]?.[col1]?.[row2 - 1]?.[col2] ?? -Infinity,
          TABLE?.[row1 - 1]?.[col1]?.[row2]?.[col2 - 1] ?? -Infinity,
          TABLE?.[row1]?.[col1 - 1]?.[row2 - 1]?.[col2] ?? -Infinity,
          TABLE?.[row1]?.[col1 - 1]?.[row2]?.[col2 - 1] ?? -Infinity
        );

        if (bestPrev === -Infinity) continue;

        TABLE[row1][col1][row2][col2] =
          bestPrev +
          (row1 === row2 && col1 === col2
            ? grid[row1][col1]
            : grid[row1][col1] + grid[row2][col2]);
      }
    }
  }

  return Math.max(0, TABLE[length - 1][length - 1][length - 1][length - 1]);
}

function getTable(length: number, dimension: number): NDArray<number> {
  if (dimension === 1) {
    return Array.from({ length }, () => -Infinity);
  }
  return Array.from({ length }, () => getTable(length, dimension - 1));
}
