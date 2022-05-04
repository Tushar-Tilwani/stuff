/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) {
    return s;
  }
  const result = new Array(numRows).fill().map(() => []);
  const maxRows = numRows - 1;

  let row = 0;
  let col = 0;
  let index = 0;
  while (index < s.length) {
    result[row][col] = s[index++];
    if (col % maxRows === 0 && row !== maxRows) {
      // When the character needs to be filled vertically
      row++;
      continue;
    }
    // When the character needs to be filled diagonally
    row--;
    col++;
  }
  return result.reduce((acc, s) => acc + s.join(""), "");
};

let s = "PAYPALISHIRING",
  numRows = 1;

console.log(convert(s, numRows));
