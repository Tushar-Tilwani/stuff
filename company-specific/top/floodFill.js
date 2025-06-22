/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  const MAX_ROW = image.length;
  const MAX_COL = image[0].length;
  const QUEUE = [[sr, sc]];
  const visited = new Array(MAX_ROW)
    .fill()
    .map(() => new Array(MAX_COL).fill(false));

  const oldColor = image[sr][sc];
  image[sr][sc] = newColor;

  while (QUEUE.length > 0) {
    const [r, c] = QUEUE.shift();
    for (const [nr, nc] of getNeighbors(image, oldColor, r, c)) {
      if (visited[nr][nc]) {
        continue;
      }
      image[nr][nc] = newColor;
      QUEUE.push([nr, nc]);
      visited[nr][nc] = true;
    }
  }

  return image;
};

function getNeighbors(image, oldColor, row, col) {
  const MAX_ROW = image.length;
  const MAX_COL = image[0].length;

  const result = [];

  if (row + 1 < MAX_ROW) {
    image[row + 1][col] === oldColor && result.push([row + 1, col]);
  }

  if (row - 1 >= 0) {
    image[row - 1][col] === oldColor && result.push([row - 1, col]);
  }

  if (col + 1 < MAX_COL) {
    image[row][col + 1] === oldColor && result.push([row, col + 1]);
  }

  if (col - 1 >= 0) {
    image[row][col - 1] === oldColor && result.push([row, col - 1]);
  }

  return result;
}
