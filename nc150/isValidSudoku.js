/**
 * @param {character[][]} board
 * @return {boolean}
 */
const SIZE = 9;
const CELL_SIZE = 3;
const isValidSudoku = function (board) {
  const seenSet = new Set();
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const value = board[row][col];
      if (value === ".") {
        continue;
      }
      const rowKey = `row:${row}|value:${value}`;
      const colKey = `col:${col}|value:${value}`;
      const cellKey = `row:${Math.floor(row / CELL_SIZE)}|col:${Math.floor(col / CELL_SIZE)}|value:${value}`;
      if (seenSet.has(rowKey) || seenSet.has(colKey) || seenSet.has(cellKey)) {
        // console.log(seenSet, rowKey, seenSet.has(rowKey), colKey, seenSet.has(colKey), cellKey, seenSet.has(cellKey));
        return false;
      }
      seenSet.add(rowKey);
      seenSet.add(colKey);
      seenSet.add(cellKey);
    }
  }

  return true;
};

// console.log(
//   isValidSudoku([
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"],
//   ])
// );
