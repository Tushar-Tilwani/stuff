/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */
var prisonAfterNDays = function (cells, n) {
  let prevCells = cells;
  const MEMO = new Map();
  const visited = new Map();
  let zeroIndex = null;
  for (let i = 0; i <= n; i++) {

    if (visited.has(prevCells.join())) {
      zeroIndex = visited.get(prevCells.join());
      break;
    }
    
    const newCells = [];
    for (let j = 0; j < prevCells.length; j++) {
      if (prevCells[j - 1] === prevCells[j + 1]) {
        newCells[j] = 1;
      } else {
        newCells[j] = 0;
      }
    }
    visited.set(prevCells.join(), i);
    MEMO.set(i, prevCells);
    prevCells = newCells;
  }

  const updatedN = n - zeroIndex;
  const INDEX_MAP = new Map();
  for (let i = zeroIndex; i < MEMO.size; i++) {
    INDEX_MAP.set(i - zeroIndex, MEMO.get(i));
  }
  const key = updatedN % INDEX_MAP.size;
  // console.log(MEMO,  key, key1);
  return INDEX_MAP.get(key);
};
