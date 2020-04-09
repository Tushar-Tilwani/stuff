// https://leetcode.com/problems/zigzag-conversion/
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  const TABLE = [];
  const length = s.length;
  const size = Math.ceil(length / 2);

  for (let i = 0; i < size; i++) {
    TABLE[i] = [];
    for (let j = 0; j < size; j++) {
      TABLE[i][j].push("");
    }
  }

  let isRowPath = false;
  let index = 0;
  let row = 0;
  let col = 0;
  while (index < s.length) {
    if (isRowPath) {
      TABLE[row][col] = s[index];
      row++;
      isRowPath = row === size - 1;
    } else {
      TABLE[row][col] = s[index];
      row--;
      col++;
      isRowPath = row === 0;
    }
    index++;
  }
  return TABLE;
};


console.log('PAYPALISHIRING');