/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const len = triangle.length;
  const TABLE = new Array(len)
    .fill(Infinity)
    .map(() => new Array(len).fill(Infinity));
  console.log(triangle);
  TABLE[0] = [triangle[0][0]];

  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      TABLE[i][j] =
        triangle[i][j] +
        Math.min(TABLE[i - 1][j - 1] ?? Infinity, TABLE[i - 1][j] ?? Infinity);
    }
  }

  return Math.min(...TABLE[len]);
};
