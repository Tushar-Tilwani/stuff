/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const result = new Array(n).fill().map(() => new Array(n).fill(null));
  const pos = ["r", "c"];
  const direction = [1, 1, -1, -1];

  let currPosIndex = 0;
  let currDirIndex = 0;
  let count = 1;

  let row = 0;
  let col = 0;

  while (count <= n * n) {
    result[row][col] = count;
    const currPosition = direction[currPosIndex];
    const currDirection = direction[currDirIndex];
    if (currPosition == "r") {
      row += currDirection;
    } else {
      col += currDirection;
    }

    if ((result[row] ?? [])[col] !== null) {
      if (currPosition === "r") {
        row -= currDirection;
      } else {
        col -= currDirection;
      }
      currPosIndex = (currPosIndex + 1) % pos.length;
      currDirIndex = (currDirIndex + 1) % direction.length;
    }
    count++;
  }

  return result;
};
